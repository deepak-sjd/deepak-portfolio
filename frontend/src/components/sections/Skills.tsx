"use client";

import { motion } from "framer-motion";
import {
  FaJava,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaPython,
} from "react-icons/fa";

import {
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiTensorflow,
  SiPytorch,
  SiLangchain,
} from "react-icons/si";

const skills = [
  { icon: <FaPython />, name: "Python", level: "Advanced" },
  { icon: <FaJava />, name: "Java", level: "Advanced" },
  { icon: <SiSpringboot />, name: "Spring Boot", level: "Advanced" },
  { icon: <FaReact />, name: "React", level: "Intermediate" },
  { icon: <SiLangchain />, name: "LangChain", level: "Intermediate" },
  { icon: <SiTensorflow />, name: "TensorFlow", level: "Intermediate" },
  { icon: <SiPytorch />, name: "PyTorch", level: "Intermediate" },
  { icon: <SiMysql />, name: "MySQL", level: "Advanced" },
  { icon: <SiPostgresql />, name: "PostgreSQL", level: "Intermediate" },
  { icon: <FaDocker />, name: "Docker", level: "Intermediate" },
  { icon: <FaGitAlt />, name: "Git", level: "Advanced" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-slate-50 py-28"
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
            TECH STACK
          </span>

          <h2 className="mt-6 text-5xl font-black text-zinc-900">
            Skills & Technologies
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-zinc-600">
            Technologies I use to build scalable backend systems,
            intelligent AI applications, enterprise software and
            modern web platforms.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {skills.map((skill, index) => (

            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .05,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all hover:shadow-xl"
            >

              <div className="flex items-center gap-5">

                <div className="rounded-2xl bg-blue-50 p-4 text-4xl text-blue-600">
                  {skill.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    {skill.name}
                  </h3>

                  <p className="text-zinc-500">
                    {skill.level}
                  </p>
                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}