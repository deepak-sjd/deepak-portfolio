"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaGithub,
  FaHeart,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

const navigation = {
  explore: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
  ],

  work: [
    { name: "Projects", href: "#projects" },
    { name: "Notes", href: "#notes" },
    { name: "Contact", href: "#contact" },
  ],

  connect: [
    {
      name: "GitHub",
      href: "https://github.com/deepak-sjd",
      external: true,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/deepak-sjd",
      external: true,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/gupta_deepak_74/",
      external: true,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Social Links                                                               */
/* -------------------------------------------------------------------------- */

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/deepak-sjd",
    icon: FaGithub,
    hover:
      "hover:border-zinc-600 hover:bg-zinc-800 hover:text-white",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/deepak-sjd",
    icon: FaLinkedin,
    hover:
      "hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/gupta_deepak_74/",
    icon: FaInstagram,
    hover:
      "hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400",
  },
];

/* -------------------------------------------------------------------------- */
/* Focus Areas                                                                */
/* -------------------------------------------------------------------------- */

const expertise = [
  "AI & Machine Learning",
  "Generative AI & RAG",
  "Computer Vision",
  "Java Backend Engineering",
  "Full Stack Applications",
];

/* -------------------------------------------------------------------------- */
/* Footer Link                                                                */
/* -------------------------------------------------------------------------- */

function FooterLink({
  name,
  href,
  external = false,
}: {
  name: string;
  href: string;
  external?: boolean;
}) {
  const className = `
    group
    inline-flex
    items-center
    text-sm
    text-zinc-400
    transition-colors
    duration-200
    hover:text-white
    focus:outline-none
    focus-visible:text-white
  `;

  const content = (
    <>
      <span
        aria-hidden="true"
        className="
          mr-2
          h-px
          w-0
          bg-blue-500
          transition-all
          duration-300
          group-hover:w-4
          group-focus-visible:w-4
        "
      />

      <span>{name}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="
        relative
        overflow-hidden
        border-t
        border-zinc-200
        bg-zinc-950
        text-white
        dark:border-zinc-800
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Ambient background                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute
            left-[10%]
            top-0
            h-72
            w-72
            -translate-y-1/2
            rounded-full
            bg-blue-600/[0.07]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[10%]
            bottom-0
            h-72
            w-72
            translate-y-1/2
            rounded-full
            bg-indigo-600/[0.06]
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          py-14
          sm:py-16
          lg:px-8
          lg:py-20
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* Main Footer                                                      */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            grid
            gap-12
            md:grid-cols-2
            lg:grid-cols-[1.6fr_1fr_1fr_1fr]
            lg:gap-12
          "
        >
          {/* ================================================================ */}
          {/* Brand                                                             */}
          {/* ================================================================ */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="#home"
              aria-label="Deepak Kumar — return to homepage"
              className="group inline-flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-600
                  text-sm
                  font-black
                  tracking-tight
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              >
                DK
              </span>

              <span
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-xl
                "
              >
                Deepak Kumar
              </span>
            </Link>

            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-7
                text-zinc-400
              "
            >
              AI Engineer and Java Full Stack Developer building intelligent
              applications, backend systems, and practical software solutions
              with a focus on clean engineering and real-world impact.
            </p>

            {/* Social icons */}
            <div
              className="mt-7 flex items-center gap-3"
              aria-label="Social media links"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Deepak Kumar on ${social.name}`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-zinc-800
                      bg-zinc-900
                      text-base
                      text-zinc-400
                      transition-all
                      duration-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:ring-offset-2
                      focus:ring-offset-zinc-950
                      ${social.hover}
                    `}
                  >
                    <Icon aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ================================================================ */}
          {/* Explore                                                           */}
          {/* ================================================================ */}

          <motion.nav
            aria-label="Explore"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h2
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-200
              "
            >
              Explore
            </h2>

            <ul className="mt-5 space-y-3">
              {navigation.explore.map((link) => (
                <li key={link.name}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ================================================================ */}
          {/* Work                                                              */}
          {/* ================================================================ */}

          <motion.nav
            aria-label="Work"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-200
              "
            >
              Work
            </h2>

            <ul className="mt-5 space-y-3">
              {navigation.work.map((link) => (
                <li key={link.name}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ================================================================ */}
          {/* Focus + Connect                                                   */}
          {/* ================================================================ */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-200
              "
            >
              Focus
            </h2>

            <ul className="mt-5 space-y-3">
              {expertise.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2.5
                    text-sm
                    text-zinc-400
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-1
                      w-1
                      shrink-0
                      rounded-full
                      bg-blue-500
                    "
                  />

                  {item}
                </li>
              ))}
            </ul>

            {/* Connect */}
            <div className="mt-8">
              <h2
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-200
                "
              >
                Connect
              </h2>

              <ul className="mt-5 space-y-3">
                {navigation.connect.map((link) => (
                  <li key={link.name}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Divider                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className="my-10 h-px bg-zinc-800 sm:my-12"
        />

        {/* ---------------------------------------------------------------- */}
        {/* Bottom row                                                        */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            flex
            flex-col
            gap-6
            text-sm
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* Copyright */}
          <p className="text-zinc-500">
            © {new Date().getFullYear()} Deepak Kumar. All rights reserved.
          </p>

          {/* Built with */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-1
              text-zinc-500
            "
          >
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
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              self-start
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              text-zinc-400
              transition-all
              duration-300
              hover:border-blue-500/50
              hover:bg-blue-500/10
              hover:text-blue-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              focus:ring-offset-zinc-950
              md:self-auto
            "
          >
            <FaArrowUp
              aria-hidden="true"
              className="transition-transform duration-300"
            />
          </motion.button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Signature                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            mt-8
            border-t
            border-zinc-900
            pt-6
            text-center
            text-xs
            text-zinc-600
          "
        >
          Designed & engineered by{" "}
          <span className="font-medium text-zinc-500">
            Deepak Kumar
          </span>
        </div>
      </div>
    </footer>
  );
}