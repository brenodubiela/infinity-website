import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappHref } from "@/data/site";

export function WhatsAppButton({ label = "Chamar no WhatsApp", message, variant = "secondary", className }) {
  const href = whatsappHref(message);

  return (
    <Button
      href={href ?? "/contato#formulario"}
      variant={variant}
      icon={WhatsAppIcon}
      className={className}
      data-whatsapp-configured={href ? "true" : "false"}
    >
      {label}
    </Button>
  );
}
