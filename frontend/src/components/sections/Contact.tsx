"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            CONTACT
          </span>

          <h2 className="mt-6 text-5xl font-black text-zinc-900">
            Let's Build Something Amazing
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            Interested in AI, Full Stack Development, or collaborating on
            innovative software solutions? Feel free to reach out.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >

            <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-2xl text-blue-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-zinc-600">
                    deepak@example.com
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <FaPhone className="text-2xl text-blue-600" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-zinc-600">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-2xl text-blue-600" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-zinc-600">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 text-3xl">
              <a
                href="https://github.com/deepak-sjd"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-blue-600"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/deepak-sjd"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-blue-600"
              >
                <FaLinkedin />
              </a>
            </div>

          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <form className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-10 shadow-lg">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-zinc-300 px-5 py-4 outline-none transition focus:border-blue-600"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-zinc-300 px-5 py-4 outline-none transition focus:border-blue-600"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-zinc-300 px-5 py-4 outline-none transition focus:border-blue-600"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full resize-none rounded-xl border border-zinc-300 px-5 py-4 outline-none transition focus:border-blue-600"
              />

              <Button className="w-full py-4 text-lg">
                Send Message
              </Button>

            </form>

          </motion.div>

        </div>

      </div>
    </section>
  );
}