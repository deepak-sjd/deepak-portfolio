"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2025 - Present",
    title: "AI Engineer",
    company: "L&T Technology Services (LTTS)",
    description:
      "Building enterprise AI solutions, RAG systems, Computer Vision applications and manufacturing AI platforms.",
  },
  {
    year: "2021 - 2025",
    title: "Bachelor of Engineering",
    company: "Chandigarh University",
    description:
      "Computer Science & Engineering with focus on Software Engineering, AI, Data Structures and System Design.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-slate-50 py-28">
      <div className="mx-auto max-w-6xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            EXPERIENCE
          </span>

          <h2 className="mt-6 text-5xl font-black">
            My Journey
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-600">
            A timeline of my education and professional experience.
          </p>
        </motion.div>

        <div className="relative mt-20 border-l-4 border-blue-600 pl-10">

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              className="relative mb-16"
            >
              <div className="absolute -left-[53px] h-6 w-6 rounded-full border-4 border-white bg-blue-600" />

              <p className="text-sm font-semibold text-blue-600">
                {item.year}
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {item.title}
              </h3>

              <h4 className="mt-1 text-lg text-zinc-500">
                {item.company}
              </h4>

              <p className="mt-4 leading-8 text-zinc-600">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}