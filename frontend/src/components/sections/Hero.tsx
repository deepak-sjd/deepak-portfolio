"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaJava, FaReact, FaDocker, FaPython } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";

import Button from "@/components/ui/Button";

const technologies = [
  { icon: <FaPython />, name: "Python" },
  { icon: <FaJava />, name: "Java" },
  { icon: <SiSpringboot />, name: "Spring Boot" },
  { icon: <FaReact />, name: "React" },
  { icon: <FaDocker />, name: "Docker" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row"
    >
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          👋 Welcome to my portfolio
        </span>

        <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-zinc-900 md:text-6xl lg:text-7xl">
  Building
  <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
    Intelligent Software
  </span>
</h1>

       <h2 className="mt-6 text-xl font-semibold text-zinc-700 md:text-2xl">
  AI Engineer • Java Full Stack Developer
</h2>

        <p className="mt-8 max-w-xl text-lg leading-9 text-zinc-600">
  I design and build production-ready AI solutions using Generative AI,
  LLMs, RAG, Computer Vision, Java Spring Boot, React, Docker, and modern
  cloud technologies to solve real business problems.
</p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Button className="px-8 py-4 text-base shadow-lg shadow-blue-500/20">
  Hire Me
</Button>

          <Button variant="secondary">View Projects</Button>
        </div>

        <div className="mt-10 flex items-center gap-5 text-3xl text-zinc-600">
          <a href="https://github.com/deepak-sjd" target="_blank" rel="noreferrer">
            <FaGithub className="transition hover:text-black" />
          </a>

          <a href="https://linkedin.com/in/deepak-sjd" target="_blank" rel="noreferrer">
            <FaLinkedin className="transition hover:text-blue-600" />
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-xl text-blue-600">{tech.icon}</span>
              <span className="font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex items-center justify-center"
      >
        <div className="flex h-[500px] w-[420px] flex-col items-center justify-center rounded-[40px] border border-zinc-200 bg-gradient-to-br from-blue-50 via-white to-indigo-100 shadow-2xl">
          <div className="mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">
            DK
          </div>

          <h3 className="text-2xl font-bold">Deepak Kumar</h3>

          <p className="mt-2 text-zinc-500">
            AI Engineer
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white p-5 text-center shadow">
              <h4 className="text-3xl font-bold text-blue-600">
                10+
              </h4>
              <p className="text-sm text-zinc-500">
                Technologies
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 text-center shadow">
              <h4 className="text-3xl font-bold text-blue-600">
                AI
              </h4>
              <p className="text-sm text-zinc-500">
                Focused
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}