"use client";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

const projects = [
  {
    title: "Enterprise RAG System",
    description:
      "Production-ready Retrieval-Augmented Generation platform with semantic search, vector database and LLM-powered document assistant.",
    technologies: [
      "Python",
      "LangChain",
      "LLM",
      "RAG",
      "Docker",
      "Milvus",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "Smart Manufacturing Time Study AI",
    description:
      "AI-powered activity recognition system for manufacturing productivity analysis using computer vision and timeline generation.",
    technologies: [
      "Python",
      "OpenCV",
      "PyTorch",
      "VideoMAE",
      "FastAPI",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "AI Fault Investigation Assistant",
    description:
      "Enterprise AI assistant that analyzes machine failures using RAG, LLMs and engineering documentation.",
    technologies: [
      "Python",
      "RAG",
      "LLM",
      "FastAPI",
      "Vector DB",
    ],
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-white py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            FEATURED PROJECTS
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Things I've Built
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-zinc-600">
            Production-ready AI applications, backend systems and
            enterprise software focused on solving real business problems.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-10 lg:grid-cols-3">

          {projects.map((project, index) => (

            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .1,
              }}
              whileHover={{
                y: -10,
              }}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg transition-all hover:shadow-2xl"
            >

              <div className="h-52 bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-500" />

              <div className="p-8">

                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-5 leading-8 text-zinc-600">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  {project.technologies.map((tech) => (

                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

                <div className="mt-8 flex gap-5">

                  <a
                    href={project.github}
                    className="flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 transition hover:bg-zinc-100"
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                  >
                    <FaExternalLinkAlt />
                    Demo
                  </a>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}