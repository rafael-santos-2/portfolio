import { useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import Reveal from "./shared/Reveal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "agostinhorafael4@gmail.com",
    href: "mailto:agostinhorafael4@gmail.com",
  },
  {
    icon: Github,
    label: "/rafael-santos-2",
    href: "https://github.com/rafael-santos-2",
  },
  {
    icon: Linkedin,
    label: "/rafael-santos",
    href: "https://www.linkedin.com/in/rafael-santos-0a0870253/",
  },
];

const inputClasses =
  "w-full bg-background border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary transition-colors";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const emailValid = EMAIL_PATTERN.test(email);
  const canSubmit = emailValid && message.trim().length > 0 && status !== "sending";

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    if (event.target.botcheck.checked) return; // honeypot tripped, silently drop

    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", "Nieuw bericht via portfolio");
      formData.append("from_name", "Portfolio contactformulier");
      formData.append("email", email);
      formData.append("message", message);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setStatus(result.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-4">
            [05] // Handshake Protocol
          </p>
          <h2 className="font-display font-bold text-4xl md:text-7xl tracking-tight leading-[0.95] text-stark">
            Start een <span className="text-accent">verbinding.</span>
          </h2>
          <p className="text-foreground mt-6 max-w-lg">
            Open een terminal en typ je bericht. Ik reageer meestal binnen
            24 uur.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 max-w-2xl">
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <span className="h-2.5 w-2.5 bg-red-500" />
              <span className="h-2.5 w-2.5 bg-accent" />
              <span className="h-2.5 w-2.5 bg-primary" />
              <span className="font-mono text-xs text-muted-foreground ml-2">
                ~/contact — zsh
              </span>
            </div>

            {status === "sent" ? (
              <div className="p-5 font-mono text-sm space-y-2">
                <p className="text-muted-foreground">$ ./send --message</p>
                <p className="text-accent">
                  ✓ Bericht verzonden. Connectie gesloten (status: 200 OK).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    $ git remote add origin
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="jouw@email.com"
                    className={inputClasses}
                  />
                  {email.length > 0 && (
                    <p
                      className={`font-mono text-[11px] mt-2 ${
                        emailValid ? "text-accent" : "text-red-500"
                      }`}
                    >
                      {emailValid
                        ? "▸ Syntax check: OK"
                        : "▸ Syntax check: FAILED"}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    $ echo "bericht" &gt;&gt; /dev/inbox
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Vertel me over je project..."
                    className={inputClasses}
                  />
                </div>

                {status === "error" && (
                  <p className="font-mono text-[11px] text-red-500">
                    ▸ Verzenden mislukt. Probeer het opnieuw of mail direct naar{" "}
                    {CONTACT_LINKS[0].label}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full md:w-auto px-6 py-3 border border-primary text-primary font-mono text-sm uppercase tracking-wider transition-colors hover:bg-primary hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                >
                  {status === "sending" ? "▸ ./sending..." : "▸ ./execute --send"}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="flex flex-wrap gap-6 mt-8">
          {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
            >
              <Icon size={14} aria-hidden="true" />
              {label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
