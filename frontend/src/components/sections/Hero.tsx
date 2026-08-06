"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-between px-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <p className="mb-4 text-lg font-medium text-blue-600">
          👋 Hi, I'm
        </p>

        <h1 className="text-6xl font-extrabold leading-tight">
          Deepak Kumar
        </h1>

        <h2 className="mt-5 text-2xl font-semibold text-zinc-600">
          AI Engineer • Full Stack Developer
        </h2>

        <p className="mt-8 text-lg leading-8 text-zinc-600">
          Building production-ready AI applications, RAG systems,
          Computer Vision solutions and scalable Java backend systems.
        </p>

        <div className="mt-10 flex gap-4">
          <Button>Hire Me</Button>
          <Button>View Projects</Button>
        </div>
      </motion.div>

      <div className="hidden items-center justify-center lg:flex">
  <div className="flex h-[430px] w-[380px] items-center justify-center rounded-3xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-white shadow-2xl">
    <span className="text-lg font-semibold text-zinc-500">
      Profile Image
    </span>
  </div>
</div>
    </section>
  );
}