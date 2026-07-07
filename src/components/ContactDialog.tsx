"use client";

import { useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Send, X } from "lucide-react";
import { setPagerPaused } from "./pagerBus";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

// Web3Forms access key. Public by design — it can only submit the form (email
// me), not read data or touch the account. Overridable via env for rotation.
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "84b1991d-a0fc-44cf-9c9e-923f317242fb";

const inputClass =
  "w-full rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/60";
const labelClass =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-faint";

/**
 * Contact form in a modal. Submits to Web3Forms (no backend needed); the access
 * key comes from NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY. Falls back to a plain mailto
 * link for anyone who would rather use their own client.
 */
export function ContactDialog({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onOpenChange = (open: boolean) => {
    setPagerPaused(open); // don't let the section pager eat scroll while typing
    if (!open) {
      // reset after the close animation
      window.setTimeout(() => {
        setStatus("idle");
        setError("");
      }, 200);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${data.get("name")}`,
          from_name: "gabrielgamaroff.com",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          botcheck: data.get("botcheck"),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm motion-safe:data-[state=open]:animate-overlay-in motion-safe:data-[state=closed]:animate-overlay-out" />
        <Dialog.Content className="group pointer-events-none fixed inset-0 z-[101] grid place-items-center p-4 motion-safe:data-[state=open]:animate-overlay-in motion-safe:data-[state=closed]:animate-overlay-out">
          <div className="pointer-events-auto w-[min(92vw,480px)] overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl motion-safe:group-data-[state=open]:animate-pop-in motion-safe:group-data-[state=closed]:animate-pop-out">
            {/* header */}
            <div className="relative border-b border-line px-5 py-4 sm:px-6 sm:py-5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-accent/10 to-transparent" />
              <Dialog.Title className="relative text-lg font-semibold tracking-[-0.01em] text-ink">
                Get in touch
              </Dialog.Title>
              <Dialog.Description className="relative mt-1 text-sm text-muted">
                Send a message and it lands straight in my inbox.
              </Dialog.Description>
              <Dialog.Close className="absolute right-3 top-3 cursor-pointer rounded-lg p-2 text-faint transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {/* body */}
            <div className="px-5 py-5 sm:px-6">
              {status === "sent" ? (
                <div className="py-6 text-center">
                  <p className="text-ink">Thanks, your message is on its way.</p>
                  <p className="mt-1 text-sm text-muted">
                    I&apos;ll get back to you soon.
                  </p>
                  <Dialog.Close className="mt-6 inline-flex cursor-pointer rounded-lg border border-line px-4 py-2 text-sm text-muted transition-colors hover:text-ink">
                    Close
                  </Dialog.Close>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* honeypot for spam bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    aria-hidden
                    className="hidden"
                  />
                  <div>
                    <label htmlFor="cf-name" className={labelClass}>
                      Name
                    </label>
                    <input id="cf-name" name="name" type="text" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className={labelClass}>
                      Email
                    </label>
                    <input id="cf-email" name="email" type="email" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cf-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      name="message"
                      required
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="What's on your mind?"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-2 disabled:cursor-default disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      "Sending…"
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-faint">
                    Or email me directly at{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-muted underline underline-offset-2 transition-colors hover:text-ink"
                    >
                      {site.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
