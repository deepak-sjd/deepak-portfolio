"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative">

            <div className="absolute -inset-3 rounded-[40px] bg-gradient-to-r from-blue-500 to-cyan-400 blur-2xl opacity-20" />

            <div className="relative flex h-[420px] w-[340px] items-center justify-center rounded-[40px] border border-zinc-200 bg-gradient-to-br from-slate-50 to-blue-50 shadow-2xl">

              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-blue-600 text-6xl font-black text-white">
                DK
              </div>

            </div>

          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            ABOUT ME
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-zinc-900">
            Building AI Solutions
            <span className="block text-blue-600">
              That Solve Real Problems
            </span>
          </h2>

          <p className="mt-8 text-lg leading-9 text-zinc-600">
            I'm an AI Engineer and Java Full Stack Developer passionate
            about building scalable software, AI-powered applications,
            enterprise RAG systems, computer vision solutions, and modern
            web platforms.
          </p>

          <p className="mt-6 text-lg leading-9 text-zinc-600">
            My goal is to combine software engineering with artificial
            intelligence to create production-ready products that deliver
            measurable business value.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">

            <div className="rounded-2xl border border-zinc-200 p-5">
              <h3 className="text-3xl font-bold text-blue-600">
                AI
              </h3>
              <p className="mt-2 text-zinc-500">
                Engineering
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-5">
              <h3 className="text-3xl font-bold text-blue-600">
                Java
              </h3>
              <p className="mt-2 text-zinc-500">
                Backend
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-5">
              <h3 className="text-3xl font-bold text-blue-600">
                React
              </h3>
              <p className="mt-2 text-zinc-500">
                Frontend
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-5">
              <h3 className="text-3xl font-bold text-blue-600">
                Cloud
              </h3>
              <p className="mt-2 text-zinc-500">
                Deployment
              </p>
            </div>

          </div>

          <div className="mt-10">
            <Button>
              Download Resume
            </Button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}