import { FaWhatsapp } from "react-icons/fa";
import { contact } from "@/content/contact";

export function WhatsAppButton() {
  const { phone, message, label } = contact.whatsapp;
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      className="whatsapp-button fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] inline-flex size-14 items-center justify-center rounded-full md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] md:right-[calc(1.5rem+env(safe-area-inset-right))]"
    >
      <span
        aria-hidden="true"
        className="whatsapp-button-circle inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white"
      >
        <FaWhatsapp className="size-7" aria-hidden="true" />
      </span>
      <span
        aria-hidden="true"
        className="whatsapp-button-label absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap rounded-full border border-subtle bg-surface px-3 py-2 text-sm font-semibold text-foreground md:block"
      >
        {label}
      </span>
    </a>
  );
}
