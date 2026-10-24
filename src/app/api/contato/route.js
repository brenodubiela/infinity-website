import { NextResponse } from "next/server";
import { contactForm, ufs } from "@/data/contato";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 5000;
const MAX_BODY_BYTES = 16_000;
const hits = new Map();

// Limite por IP em memória: vale por instância (na Vercel cada instância tem o seu).
// Para limite global, usar uma regra de rate limit do Vercel Firewall em /api/contato.
function rateLimited(ip, now) {
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.delete(ip);
  hits.set(ip, recent);
  if (hits.size > MAX_TRACKED_IPS) {
    // Descarta os IPs menos recentes (o Map mantém a ordem de inserção).
    for (const key of hits.keys()) {
      if (hits.size <= MAX_TRACKED_IPS) break;
      if (key !== ip) hits.delete(key);
    }
  }
  return recent.length > MAX_REQUESTS;
}

function clean(value, max = 500) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max) : "";
}

function cleanMultiline(value, max) {
  return typeof value === "string"
    ? value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, " ").trim().slice(0, max)
    : "";
}

function samePath(value) {
  const path = clean(value, 300);
  return path.startsWith("/") && !path.startsWith("//") ? path : "";
}

function reject(status, error) {
  return NextResponse.json(error ? { ok: false, error } : { ok: false }, { status });
}

function validate(body) {
  const data = {
    nome: clean(body.nome, 160),
    empresa: clean(body.empresa, 160),
    telefone: clean(body.telefone, 32).replace(/[^\d()+\-\s]/g, ""),
    email: clean(body.email, 160).toLowerCase(),
    tipoDemanda: clean(body.tipo, 64),
    uf: clean(body.uf, 2).toUpperCase(),
    descricao: cleanMultiline(body.descricao, 5000),
    urlPagina: samePath(body.urlPagina),
  };
  const errors = [];
  if (data.nome.length < 3) errors.push("nome");
  if (data.telefone.replace(/\D/g, "").length < 10) errors.push("telefone");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.push("email");
  if (!contactForm.demandTypes.includes(data.tipoDemanda)) errors.push("tipo");
  if (data.uf && !ufs.includes(data.uf)) errors.push("uf");
  if (data.descricao.length < 10) errors.push("descricao");
  if (body.consentimento !== true) errors.push("consentimento");
  return { data, errors };
}

export async function POST(request) {
  // Só aceita envio do próprio site (navegadores mandam Sec-Fetch-Site) e em JSON.
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return reject(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reject(415);
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return reject(413);

  const now = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip, now)) {
    return reject(429, "Muitas tentativas. Tente novamente em alguns minutos.");
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reject(413);
  let body = null;
  try {
    body = JSON.parse(raw);
  } catch {}
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return reject(400, "Requisição inválida.");
  }

  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validate(body);
  if (errors.length) {
    return NextResponse.json({ ok: false, error: "Dados inválidos.", fields: errors }, { status: 400 });
  }

  const payload = {
    ...data,
    mensagem: data.descricao,
    consentimentoLgpd: true,
    origem: "site-infinity",
    enviadoEm: new Date(now).toISOString(),
  };

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[api/contato] N8N_WEBHOOK_URL ausente. Payload simulado:", payload);
      return NextResponse.json({ ok: true, simulated: true });
    }
    return reject(503, "Serviço indisponível.");
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Credencial do webhook (Header Auth no nó Webhook do n8n). Opcional, mas recomendada.
        ...(process.env.N8N_WEBHOOK_SECRET && { "X-Webhook-Secret": process.env.N8N_WEBHOOK_SECRET }),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`webhook ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Só nome e mensagem do erro: o objeto completo pode trazer o endereço do webhook.
    console.error("[api/contato] Falha ao encaminhar para o n8n:", error?.name, error?.message);
    return reject(502, "Não foi possível enviar agora.");
  }
}
