"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaCode,
  FaGithub,
  FaHeart,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/deepak-sjd",
    icon: FaGithub,
    hover:
      "hover:border-zinc-500 hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-800",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/deepak-sjd",
    icon: FaLinkedin,
    hover:
      "hover:border-blue-500/60 hover:bg-blue-500/10 hover:text-blue-400",
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram,
    hover:
      "hover:border-pink-500/60 hover:bg-pink-500/10 hover:text-pink-400",
  },
];

const expertise = [
  "AI & Machine Learning",
  "Generative AI & RAG",
  "Computer Vision",
  "Java Backend Engineering",
  "Full Stack Applications",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden border-t border-zinc-200 bg-zinc-950 text-white dark:border-zinc-800"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main footer content */}
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="#home"
              aria-label="Return to homepage"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:-translate-y-0.5">
                DK
              </span>

              <span className="text-xl font-bold tracking-tight text-white">
                Deepak Kumar
              </span>
            </Link>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400">
              AI Engineer and Java Full Stack Developer building intelligent
              applications, backend systems, and practical software solutions
              with a focus on clean engineering and real-world impact.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const isPlaceholder = social.href === "#";

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={isPlaceholder ? undefined : "_blank"}
                    rel={
                      isPlaceholder ? undefined : "noopener noreferrer"
                    }
                    aria-label={`Visit ${social.name}`}
                    aria-disabled={isPlaceholder}
                    onClick={(event) => {
                      if (isPlaceholder) {
                        event.preventDefault();
                      }
                    }}
                    whileHover={isPlaceholder ? undefined : { y: -3 }}
                    whileTap={isPlaceholder ? undefined : { scale: 0.96 }}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-lg text-zinc-400 transition-all duration-300 ${
                      isPlaceholder
                        ? "cursor-not-allowed opacity-50"
                        : social.hover
                    }`}
                  >
                    <Icon aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-200">
              Navigation
            </h2>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="mr-2 h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-4"
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-200">
              Focus Areas
            </h2>

            <ul className="mt-6 space-y-3">
              {expertise.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-blue-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-zinc-800" />

        {/* Bottom row */}
        <div className="flex flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-zinc-500">
            © {new Date().getFullYear()} Deepak Kumar. All rights reserved.
          </p>

          {/* Built with */}
          <div className="flex flex-wrap items-center gap-2 text-zinc-500">
            <span>Built with</span>

            <FaHeart
              aria-hidden="true"
              className="text-red-500"
            />

            <span>using</span>

            <span className="font-medium text-zinc-300">
              Next.js
            </span>

            <span aria-hidden="true">•</span>

            <span className="font-medium text-zinc-300">
              TypeScript
            </span>

            <span aria-hidden="true">•</span>

            <span className="font-medium text-zinc-300">
              Tailwind CSS
            </span>
          </div>

          {/* Back to top */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Back to top"
            title="Back to top"
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-300 hover:border-blue-500/60 hover:bg-blue-500/10 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            <FaArrowUp
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>

        {/* Signature */}
        <div className="mt-10 flex items-center justify-center gap-2 border-t border-zinc-900 pt-7 text-xs text-zinc-600">
          <FaCode aria-hidden="true" />
          <span>Designed & engineered by Deepak Kumar</span>
        </div>
      </div>
    </motion.footer>
  );
}
