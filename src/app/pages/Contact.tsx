import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, Instagram, Linkedin, Pencil, RotateCcw, Send } from "lucide-react";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import ClickSpark from "../components/ClickSpark";
import avatarImg from "../../assets/home/Raphi_Mii_4K.webp";

const LINKEDIN = "https://www.linkedin.com/in/rapha%C3%ABl-seiler-47b3a1338";
const INSTAGRAM = "https://www.instagram.com/seiler_raphi/";

type Step = "name" | "email" | "message" | "confirm" | "sending" | "done" | "failed";
type Bubble = { id: number; from: "raphi" | "me"; text: string; status?: string; summary?: { name: string; email: string; message: string } };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Contact as an iMessage conversation: Raphi asks, the visitor answers in the compose bar. */
export function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const de = lang === "de";
  const reduceMotion = useReducedMotion();

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [draft, setDraft] = useState("");
  const [answers, setAnswers] = useState({ name: "", email: "", message: "" });
  const nextId = useRef(0);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Raphi "types" for a moment before each message appears
  const say = (texts: string[], then?: () => void) => {
    const pause = reduceMotion ? 150 : 900;
    let delay = 0;
    texts.forEach((text, i) => {
      timers.current.push(window.setTimeout(() => setTyping(true), delay));
      delay += pause + Math.min(text.length * 12, 700);
      timers.current.push(
        window.setTimeout(() => {
          setTyping(false);
          setBubbles((b) => [...b, { id: nextId.current++, from: "raphi", text }]);
          if (i === texts.length - 1) then?.();
        }, delay),
      );
      delay += 250;
    });
  };

  const start = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setBubbles([]);
    setAnswers({ name: "", email: "", message: "" });
    setDraft("");
    setStep("name");
    say(
      de
        ? ["Hallo! 👋", "Schön, dass du vorbeischaust. Ich freue mich über jede Nachricht.", "Wie heisst du?"]
        : ["Hi there! 👋", "Great to have you here. I'm happy about every message.", "What's your name?"],
    );
  };

  // Restart the conversation when the page opens or the language changes
  useEffect(() => {
    start();
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Keep the newest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [bubbles, typing, step, reduceMotion]);

  /** Sends the message directly via Formspree (no mail app). */
  const send = async () => {
    const data = answers;
    setStep("sending");
    setBubbles((b) => [...b, { id: nextId.current++, from: "me", text: de ? "Ja, senden" : "Yes, send it" }]);
    let ok = false;
    try {
      const response = await fetch("https://formspree.io/f/xkopgkeq", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
      ok = response.ok;
    } catch {
      ok = false;
    }
    if (!ok) {
      setStep("failed");
      say([
        de
          ? "Oh nein, das hat gerade nicht geklappt. Deine Nachricht ist noch da – versuch es gleich nochmal."
          : "Oh no, that didn't work just now. Your message is still here – please try again.",
      ]);
      return;
    }
    setBubbles((b) => b.map((x, i) => (i === b.length - 1 ? { ...x, status: de ? "Zugestellt" : "Delivered" } : x)));
    setStep("done");
    say(
      de
        ? [`Danke, ${data.name}! Deine Nachricht ist angekommen.`, "Ich melde mich so bald wie möglich bei dir. 🙌"]
        : [`Thanks, ${data.name}! Your message arrived.`, "I'll get back to you as soon as I can. 🙌"],
    );
  };

  /** Back to the message step with the text pre-filled. */
  const edit = () => {
    setBubbles((b) => [...b, { id: nextId.current++, from: "me", text: de ? "Nochmal bearbeiten" : "Edit it" }]);
    setDraft(answers.message);
    setStep("message");
    say([de ? "Kein Problem. Pass deine Nachricht an und schick sie mir nochmal." : "No problem. Adjust your message and send it again."], () =>
      inputRef.current?.focus(),
    );
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const value = draft.trim();
    if (!value || typing || !["name", "email", "message"].includes(step)) return;
    setBubbles((b) => [...b, { id: nextId.current++, from: "me", text: value }]);
    setDraft("");

    if (step === "name") {
      setAnswers((a) => ({ ...a, name: value }));
      setStep("email");
      say(
        de
          ? [`Freut mich, ${value}!`, "Unter welcher E-Mail-Adresse kann ich dir antworten?"]
          : [`Nice to meet you, ${value}!`, "Which email address can I reply to?"],
      );
    } else if (step === "email") {
      if (!isEmail(value)) {
        say([de ? "Hmm, das sieht nicht nach einer E-Mail-Adresse aus. Probierst du es nochmal?" : "Hmm, that doesn't look like an email address. Try again?"]);
        return;
      }
      setAnswers((a) => ({ ...a, email: value }));
      setStep("message");
      say([de ? "Perfekt. Und was möchtest du mir sagen?" : "Perfect. And what would you like to tell me?"]);
    } else if (step === "message") {
      const data = { ...answers, message: value };
      setAnswers(data);
      setStep("confirm");
      say([de ? "Hier nochmal alles auf einen Blick:" : "Here's everything at a glance:"], () => {
        setBubbles((b) => [...b, { id: nextId.current++, from: "raphi", text: "", summary: data }]);
        say([de ? "Soll ich die Nachricht so senden?" : "Shall I send it like this?"]);
      });
    }
    inputRef.current?.focus();
  };

  const placeholder = {
    name: de ? "Dein Name" : "Your name",
    email: de ? "deine@email.ch" : "your@email.com",
    message: de ? "Deine Nachricht" : "Your message",
    confirm: de ? "Bitte bestätigen" : "Please confirm",
    sending: de ? "Wird gesendet …" : "Sending …",
    done: de ? "Nachricht gesendet" : "Message sent",
    failed: de ? "Nicht gesendet" : "Not sent",
  }[step];
  const inputDisabled = !["name", "email", "message"].includes(step);

  const actions = [
    { label: "LinkedIn", icon: Linkedin, href: LINKEDIN },
    { label: "Instagram", icon: Instagram, href: INSTAGRAM },
  ];

  return (
    <ClickSpark sparkColor={isDark ? "#ffffff" : "#000000"} sparkSize={19} sparkRadius={40} sparkCount={13} duration={400} disableOnMobile>
      <div className="relative w-full min-h-screen overflow-hidden pt-32 pb-24">
        {/* Soft colour glow behind the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_20%_15%,rgba(0,113,227,0.12),transparent_70%),radial-gradient(ellipse_55%_45%_at_85%_75%,rgba(191,90,242,0.12),transparent_70%)]"
        />

        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">{t.contact.title}</h1>
            <p className="text-xl text-[#5e5e63] dark:text-[#b8b8b8] max-w-xl">{t.contact.description}</p>
          </motion.div>

          <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start">
            {/* Contact card, like in the iOS Contacts app */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[32px] bg-[#f5f5f7]/80 dark:bg-[#1d1d1f]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 p-8 text-center lg:sticky lg:top-28"
            >
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden bg-gradient-to-b from-[#d2d2d7] to-[#a1a1a6] dark:from-[#48484a] dark:to-[#2c2c2e]">
                <img src={avatarImg} alt="Raphaël Seiler" className="w-full h-full object-cover object-top scale-[1.35] translate-y-[14%]" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">Raphaël Seiler</h2>
              <p className="mt-1 text-[#5e5e63] dark:text-[#b8b8b8]">{de ? "Digital Design Student" : "Digital Design student"}</p>

              <div className="mt-8 flex justify-center gap-6">
                {actions.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 rounded-2xl px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc]"
                  >
                    <span className="w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-[#2c2c2e] text-[#0071e3] dark:text-[#2997ff] shadow-sm transition-transform group-hover:scale-110 group-active:scale-95">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-medium text-[#0071e3] dark:text-[#2997ff]">{label}</span>
                  </a>
                ))}
              </div>

              <dl className="mt-8 text-left rounded-2xl bg-white dark:bg-[#2c2c2e]">
                <div className="px-5 py-3">
                  <dt className="text-xs text-[#5e5e63] dark:text-[#b8b8b8]">{de ? "Hochschule" : "University"}</dt>
                  <dd className="text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {de ? "OST – Ostschweizer Fachhochschule" : "OST – Eastern Switzerland University of Applied Sciences"}
                  </dd>
                </div>
              </dl>
            </motion.aside>

            {/* Messages window */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              aria-label={de ? "Nachricht an Raphaël" : "Message to Raphaël"}
              className="rounded-[32px] overflow-hidden bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)] flex flex-col h-[620px]"
            >
              {/* Header */}
              <div className="shrink-0 flex flex-col items-center gap-1 py-4 bg-[#f5f5f7]/90 dark:bg-[#2c2c2e]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/10">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-b from-[#d2d2d7] to-[#a1a1a6] dark:from-[#48484a] dark:to-[#2c2c2e]">
                  <img src={avatarImg} alt="" aria-hidden="true" className="w-full h-full object-cover object-top scale-[1.35] translate-y-[14%]" />
                </div>
                <span className="text-xs font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Raphi</span>
              </div>

              {/* Conversation */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-2" role="log" aria-live="polite">
                <p className="text-center text-xs text-[#86868b] mb-4">{de ? "Heute" : "Today"}</p>
                <AnimatePresence initial={false}>
                  {bubbles.map((b, i) => {
                    const mine = b.from === "me";
                    const lastOfGroup = bubbles[i + 1]?.from !== b.from;
                    return (
                      <motion.div
                        key={b.id}
                        layout
                        initial={{ opacity: 0, y: 12, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        className={`flex flex-col ${mine ? "items-end" : "items-start"} ${lastOfGroup ? "pb-2" : ""}`}
                        style={{ transformOrigin: mine ? "bottom right" : "bottom left" }}
                      >
                        <p
                          className={`max-w-[80%] px-4 py-2.5 text-[15px] leading-snug whitespace-pre-wrap break-words ${
                            mine
                              ? "bg-[#0a84ff] text-white rounded-[20px] rounded-br-[6px]"
                              : "bg-[#e9e9eb] dark:bg-[#3a3a3c] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-[20px] rounded-bl-[6px]"
                          }`}
                        >
                          {b.summary ? (
                            <span className="block min-w-[220px]">
                              <span className="block text-xs text-[#86868b]">{de ? "Name" : "Name"}</span>
                              <span className="block font-medium mb-2">{b.summary.name}</span>
                              <span className="block text-xs text-[#86868b]">{de ? "E-Mail" : "Email"}</span>
                              <span className="block font-medium mb-2 break-all">{b.summary.email}</span>
                              <span className="block text-xs text-[#86868b]">{de ? "Nachricht" : "Message"}</span>
                              <span className="block">{b.summary.message}</span>
                            </span>
                          ) : (
                            b.text
                          )}
                        </p>
                        {b.status && <span className="mt-1 mr-1 text-[11px] text-[#86868b]">{b.status}</span>}
                      </motion.div>
                    );
                  })}
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-start"
                      style={{ transformOrigin: "bottom left" }}
                      aria-label={de ? "Raphi schreibt" : "Raphi is typing"}
                    >
                      <span className="flex gap-1 px-4 py-3.5 rounded-[20px] rounded-bl-[6px] bg-[#e9e9eb] dark:bg-[#3a3a3c]">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="w-2 h-2 rounded-full bg-[#8e8e93]"
                            animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                          />
                        ))}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {(step === "confirm" || step === "failed") && !typing && bubbles[bubbles.length - 1]?.from === "raphi" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap justify-end gap-2 pt-2"
                  >
                    <button
                      type="button"
                      onClick={edit}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0a84ff] text-[#0a84ff] text-sm font-medium hover:bg-[#0a84ff]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc]"
                    >
                      <Pencil size={14} aria-hidden="true" />
                      {de ? "Bearbeiten" : "Edit"}
                    </button>
                    <button
                      type="button"
                      onClick={send}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a84ff] text-white text-sm font-medium hover:bg-[#0071e3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc] focus-visible:ring-offset-2"
                    >
                      <Send size={14} aria-hidden="true" />
                      {step === "failed" ? (de ? "Nochmal senden" : "Try again") : de ? "Ja, senden" : "Yes, send it"}
                    </button>
                  </motion.div>
                )}

                {step === "done" && !typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center pt-6">
                    <button
                      type="button"
                      onClick={start}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e] text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#e8e8ed] dark:hover:bg-[#3a3a3c] transition-colors"
                    >
                      <RotateCcw size={14} aria-hidden="true" />
                      {de ? "Neue Nachricht" : "New message"}
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Compose bar */}
              <form onSubmit={onSubmit} className="shrink-0 flex items-end gap-2 px-3 md:px-4 py-3 border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#1c1c1e]">
                <label htmlFor="compose" className="sr-only">
                  {placeholder}
                </label>
                <textarea
                  id="compose"
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  disabled={inputDisabled}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      onSubmit(e);
                    }
                  }}
                  placeholder={placeholder}
                  autoComplete={step === "name" ? "name" : step === "email" ? "email" : "off"}
                  inputMode={step === "email" ? "email" : "text"}
                  className="flex-1 resize-none max-h-32 rounded-[20px] border border-[#d2d2d7] dark:border-[#48484a] bg-transparent px-4 py-2.5 text-[15px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#a1a1a6] focus:outline-none focus:border-[#0a84ff] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || typing || inputDisabled}
                  aria-label={de ? "Senden" : "Send"}
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-[#0a84ff] text-white transition-all hover:bg-[#0071e3] disabled:bg-[#d2d2d7] dark:disabled:bg-[#48484a] disabled:cursor-default"
                >
                  <ArrowUp size={20} strokeWidth={2.5} />
                </button>
              </form>
            </motion.section>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}
