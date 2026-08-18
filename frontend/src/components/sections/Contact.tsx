"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaSpinner,
} from "react-icons/fa";

import Button from "@/components/ui/Button";
import { submitContactMessage } from "@/lib/api/contact";

const contactDetails = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "deepakg@gmail.com",
    href: "mailto:deepakg@gmail.com",
    description: "Best for professional inquiries",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 74795 19511",
    href: "tel:+917479519511",
    description: "Available for direct conversations",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "Chennai, Tamil Nadu",
    href: "#",
    description: "India · IST (UTC+5:30)",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/deepak-sjd",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "#",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#",
  },
];

const collaborationTypes = [
  "Full-time opportunities",
  "Freelance & client projects",
  "AI / software collaboration",
  "Technical networking",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  // Honeypot field.
  if (formData.get("website")) {
    return;
  }

  setStatus("submitting");

  try {
    await submitContactMessage({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    });

    form.reset();
    setStatus("success");
  } catch (error) {
    console.error("Contact form submission failed:", error);
    setStatus("error");
  }
}

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="
        relative
        overflow-hidden
        border-t
        border-zinc-200/70
        bg-white
        py-24
        dark:border-zinc-800
        dark:bg-zinc-950
        sm:py-28
        lg:py-32
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND ATMOSPHERE */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/[0.07]
          blur-[120px]
          dark:bg-blue-500/[0.06]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/[0.06]
          blur-[130px]
          dark:bg-cyan-500/[0.05]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.22]
          [background-image:linear-gradient(to_right,rgba(24,24,27,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.035)_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-0
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9 bg-blue-600 dark:bg-blue-400"
            />

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Contact
            </span>
          </div>

          <h2
            id="contact-heading"
            className="
              mt-6
              max-w-4xl
              text-4xl
              font-black
              leading-[1.06]
              tracking-[-0.035em]
              text-zinc-950
              dark:text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[4rem]
            "
          >
            Let&apos;s build something
            <span
              className="
                block
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-cyan-600
                bg-clip-text
                text-transparent
                dark:from-blue-400
                dark:via-indigo-400
                dark:to-cyan-400
              "
            >
              worth building.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 md:text-lg">
            Have an opportunity, a product idea, an AI challenge, or simply
            want to connect? I&apos;m always open to thoughtful conversations
            around technology, engineering, and building useful software.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* MAIN CONTENT */}
        {/* ========================================================= */}

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          {/* ======================================================= */}
          {/* LEFT COLUMN */}
          {/* ======================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Direct contact */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                  Direct contact
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]"
                  />

                  Open to conversations
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {contactDetails.map((item) => {
                  const Icon = item.icon;
                  const isLocation = item.label === "Location";

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="
                        group
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border
                        border-zinc-200/80
                        bg-white/75
                        p-4
                        shadow-[0_8px_30px_-24px_rgba(24,24,27,0.4)]
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-blue-200
                        hover:bg-white
                        hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.35)]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-blue-500
                        focus-visible:ring-offset-4
                        dark:border-zinc-800
                        dark:bg-zinc-900/70
                        dark:hover:border-zinc-700
                        dark:hover:bg-zinc-900
                        dark:focus-visible:ring-offset-zinc-950
                      "
                    >
                      <span
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-600
                          transition-all
                          duration-300
                          group-hover:bg-blue-600
                          group-hover:text-white
                          dark:bg-blue-950/50
                          dark:text-blue-400
                          dark:group-hover:bg-blue-500
                          dark:group-hover:text-white
                        "
                      >
                        <Icon aria-hidden="true" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-600">
                          {item.label}
                        </span>

                        <span className="mt-1 block truncate text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {item.value}
                        </span>

                        <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-500">
                          {item.description}
                        </span>
                      </span>

                      {!isLocation && (
                        <FaArrowRight
                          aria-hidden="true"
                          className="
                            shrink-0
                            text-xs
                            text-zinc-300
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                            group-hover:text-blue-500
                            dark:text-zinc-700
                          "
                        />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Collaboration */}
            <div className="mt-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                Open for
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {collaborationTypes.map((type) => (
                  <span
                    key={type}
                    className="
                      rounded-full
                      border
                      border-zinc-200
                      bg-zinc-50
                      px-3.5
                      py-2
                      text-xs
                      font-semibold
                      text-zinc-600
                      dark:border-zinc-800
                      dark:bg-zinc-900
                      dark:text-zinc-400
                    "
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="mt-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                Find me online
              </p>

              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${social.name}`}
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-zinc-200
                        bg-white
                        text-zinc-500
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-blue-200
                        hover:bg-blue-50
                        hover:text-blue-600
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-blue-500
                        focus-visible:ring-offset-4
                        dark:border-zinc-800
                        dark:bg-zinc-900
                        dark:text-zinc-400
                        dark:hover:border-zinc-700
                        dark:hover:bg-zinc-800
                        dark:hover:text-blue-400
                        dark:focus-visible:ring-offset-zinc-950
                      "
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Response expectation */}
            <div
              className="
                mt-9
                rounded-2xl
                border
                border-blue-100
                bg-gradient-to-br
                from-blue-50
                to-indigo-50/70
                p-5
                dark:border-blue-950/60
                dark:from-blue-950/30
                dark:to-indigo-950/20
              "
            >
              <div className="flex items-start gap-3">
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-blue-600
                    shadow-sm
                    dark:bg-zinc-900
                    dark:text-blue-400
                  "
                >
                  <FaClock aria-hidden="true" className="text-sm" />
                </span>

                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    Response time
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                    I aim to respond to genuine inquiries within 1–2 business
                    days.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================================= */}
          {/* FORM */}
          {/* ======================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-zinc-200/80
                bg-white/80
                p-6
                shadow-[0_25px_80px_-35px_rgba(24,24,27,0.35)]
                backdrop-blur-xl
                dark:border-zinc-800
                dark:bg-zinc-900/80
                dark:shadow-black/20
                md:p-8
              "
            >
              {/* Form accent */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-1
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-500
                  to-cyan-500
                "
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    Start a conversation
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    Tell me what you&apos;re building.
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    Share a little context and I&apos;ll get back to you with
                    the next steps.
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    hidden
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    sm:flex
                    dark:bg-blue-950/50
                    dark:text-blue-400
                  "
                >
                  <FaPaperPlane />
                </div>
              </div>

              {/* Fields */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    Name
                    <span className="ml-1 text-blue-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-zinc-200
                      bg-zinc-50/70
                      px-4
                      py-3.5
                      text-sm
                      text-zinc-900
                      outline-none
                      transition
                      placeholder:text-zinc-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-zinc-700
                      dark:bg-zinc-950/70
                      dark:text-white
                      dark:placeholder:text-zinc-600
                      dark:focus:bg-zinc-950
                    "
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    Email
                    <span className="ml-1 text-blue-500">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-zinc-200
                      bg-zinc-50/70
                      px-4
                      py-3.5
                      text-sm
                      text-zinc-900
                      outline-none
                      transition
                      placeholder:text-zinc-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                      dark:border-zinc-700
                      dark:bg-zinc-950/70
                      dark:text-white
                      dark:placeholder:text-zinc-600
                      dark:focus:bg-zinc-950
                    "
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                >
                  Subject
                  <span className="ml-1 text-blue-500">*</span>
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  minLength={3}
                  maxLength={150}
                  placeholder="What would you like to discuss?"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-200
                    bg-zinc-50/70
                    px-4
                    py-3.5
                    text-sm
                    text-zinc-900
                    outline-none
                    transition
                    placeholder:text-zinc-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-zinc-700
                    dark:bg-zinc-950/70
                    dark:text-white
                    dark:placeholder:text-zinc-600
                    dark:focus:bg-zinc-950
                  "
                />
              </div>

              {/* Message */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    Message
                    <span className="ml-1 text-blue-500">*</span>
                  </label>

                  <span className="text-[11px] text-zinc-400">
                    Be as detailed as you like
                  </span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={20}
                  maxLength={5000}
                  rows={7}
                  placeholder="Tell me about the opportunity, project, technical challenge, or idea..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-zinc-200
                    bg-zinc-50/70
                    px-4
                    py-3.5
                    text-sm
                    leading-6
                    text-zinc-900
                    outline-none
                    transition
                    placeholder:text-zinc-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    dark:border-zinc-700
                    dark:bg-zinc-950/70
                    dark:text-white
                    dark:placeholder:text-zinc-600
                    dark:focus:bg-zinc-950
                  "
                />
              </div>

              {/* Honeypot */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Website</label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Status */}
              {status === "success" && (
                <div
                  role="status"
                  className="
                    mt-5
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-emerald-200
                    bg-emerald-50
                    p-4
                    dark:border-emerald-900/50
                    dark:bg-emerald-950/30
                  "
                >
                  <span
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-500
                      text-white
                    "
                  >
                    <FaCheck className="text-xs" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                      Message sent successfully.
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-emerald-700/80 dark:text-emerald-400/80">
                      Thanks for reaching out. I&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    p-4
                    text-sm
                    text-red-700
                    dark:border-red-900/50
                    dark:bg-red-950/30
                    dark:text-red-400
                  "
                >
                  Something went wrong while sending your message. Please try
                  again or email me directly.
                </div>
              )}

              {/* Submit */}
              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="
                    group
                    w-full
                    justify-center
                    py-4
                    text-sm
                    font-semibold
                    shadow-lg
                    shadow-blue-500/15
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {status === "submitting" ? (
                    <>
                      <FaSpinner
                        aria-hidden="true"
                        className="mr-2 animate-spin"
                      />

                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message

                      <FaArrowRight
                        aria-hidden="true"
                        className="
                          ml-2
                          text-xs
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </>
                  )}
                </Button>
              </div>

              <p className="mt-4 text-center text-[11px] leading-5 text-zinc-400 dark:text-zinc-600">
                Your information is used only to respond to your inquiry.
              </p>
            </form>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM CTA */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            mt-16
            flex
            flex-col
            items-start
            justify-between
            gap-6
            border-t
            border-zinc-200/80
            pt-8
            sm:flex-row
            sm:items-center
            dark:border-zinc-800
          "
        >
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Prefer email?
            </p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              You can always reach me directly.
            </p>
          </div>

          <a
            href="mailto:deepakg@gmail.com"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-blue-600
              transition-colors
              hover:text-blue-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-4
              dark:text-blue-400
              dark:hover:text-blue-300
              dark:focus-visible:ring-offset-zinc-950
            "
          >
            deepakg@gmail.com

            <FaArrowRight
              aria-hidden="true"
              className="
                text-xs
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
