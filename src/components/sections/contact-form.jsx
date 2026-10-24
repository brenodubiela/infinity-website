"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { buttonClasses } from "@/components/ui/button";
import { contactForm, formMessages, ufs } from "@/data/contato";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function maskPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const noop = () => () => {};

export function ContactForm() {
  const [status, setStatus] = useState("idle");
  // Falso no HTML do servidor e durante a hidratação: o envio só é liberado com o JavaScript ativo,
  // para o navegador nunca mandar os dados pela URL (envio GET nativo).
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const successRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      nome: "",
      empresa: "",
      telefone: "",
      email: "",
      tipo: "",
      uf: "",
      descricao: "",
      consentimento: false,
      website: "",
    },
  });

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (data) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, urlPagina: window.location.pathname }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);
  const phoneProps = () => {
    const { onChange, ...field } = register("telefone", {
      required: formMessages.required,
      validate: (value) => value.replace(/\D/g, "").length >= 10 || formMessages.invalidPhone,
    });
    return {
      ...field,
      onChange: (event) => {
        setValue("telefone", maskPhone(event.target.value));
        onChange(event);
      },
    };
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-2 rounded-md border border-border bg-canvas p-4 outline-none"
      >
        <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="size-5 text-ink" />
        <h3 className="text-2xl font-semibold">{formMessages.successTitle}</h3>
        <p className="text-base text-muted">{formMessages.successText}</p>
        <button type="button" onClick={() => setStatus("idle")} className={buttonClasses({ variant: "outline", className: "mt-2" })}>
          {formMessages.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-3 sm:grid-cols-2">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Field id="nome" label={contactForm.fields.nome} error={errors.nome?.message} className="sm:col-span-2">
        <Input
          id="nome"
          autoComplete="name"
          invalid={!!errors.nome}
          describedBy={describedBy("nome")}
          aria-required="true"
          {...register("nome", { required: formMessages.required, minLength: { value: 3, message: formMessages.required } })}
        />
      </Field>

      <Field id="empresa" label={contactForm.fields.empresa}>
        <Input id="empresa" autoComplete="organization" {...register("empresa")} />
      </Field>

      <Field id="telefone" label={contactForm.fields.telefone} error={errors.telefone?.message}>
        <Input
          id="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          invalid={!!errors.telefone}
          describedBy={describedBy("telefone")}
          aria-required="true"
          {...phoneProps()}
        />
      </Field>

      <Field id="email" label={contactForm.fields.email} error={errors.email?.message} className="sm:col-span-2">
        <Input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          invalid={!!errors.email}
          describedBy={describedBy("email")}
          aria-required="true"
          {...register("email", {
            required: formMessages.required,
            pattern: { value: EMAIL, message: formMessages.invalidEmail },
          })}
        />
      </Field>

      <Field id="tipo" label={contactForm.fields.tipo} error={errors.tipo?.message}>
        <Select
          id="tipo"
          invalid={!!errors.tipo}
          describedBy={describedBy("tipo")}
          aria-required="true"
          {...register("tipo", { required: formMessages.required })}
        >
          <option value="" disabled>
            {formMessages.selectPlaceholder}
          </option>
          {contactForm.demandTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Field>

      <Field id="uf" label={contactForm.fields.uf}>
        <Select id="uf" {...register("uf")}>
          <option value="">{formMessages.selectPlaceholder}</option>
          {ufs.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </Select>
      </Field>

      <Field id="descricao" label={contactForm.fields.descricao} error={errors.descricao?.message} className="sm:col-span-2">
        <Textarea
          id="descricao"
          invalid={!!errors.descricao}
          describedBy={describedBy("descricao")}
          aria-required="true"
          {...register("descricao", {
            required: formMessages.required,
            minLength: { value: 10, message: formMessages.shortDescription },
          })}
        />
      </Field>

      <div className="sm:col-span-2">
        <Checkbox
          id="consentimento"
          invalid={!!errors.consentimento}
          describedBy={describedBy("consentimento")}
          aria-required="true"
          {...register("consentimento", { required: formMessages.consentRequired })}
        >
          {contactForm.consent}{" "}
          <Link href="/politica-de-privacidade" className="text-ink underline underline-offset-4 hover:text-primary">
            {contactForm.consentLink}
          </Link>
          .
        </Checkbox>
        {errors.consentimento && (
          <p id="consentimento-error" role="alert" className="mt-1 text-sm text-primary">
            {errors.consentimento.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={!hydrated || status === "sending"} className={buttonClasses({ variant: "primary" })}>
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="size-[20px] animate-spin" />
              <span>{formMessages.sending}</span>
            </>
          ) : (
            <>
              <span>{contactForm.submit}</span>
              <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-[20px]" />
            </>
          )}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-primary">
          {status === "error" ? formMessages.errorText : ""}
        </p>
      </div>
    </form>
  );
}
