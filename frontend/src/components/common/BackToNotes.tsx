"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface BackToNotesProps {
  children?: React.ReactNode;
}

export default function BackToNotes({
  children = "Back to notes",
}: BackToNotesProps) {
  const router = useRouter();

  const handleClick = () => {
    sessionStorage.setItem("portfolio-scroll-target", "notes");
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        text-sm
        font-semibold
        text-zinc-500
        transition-colors
        hover:text-blue-600
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500
        focus-visible:ring-offset-4
        dark:text-zinc-400
        dark:hover:text-blue-400
        dark:focus-visible:ring-offset-zinc-950
      "
    >
      <FaArrowLeft
        aria-hidden="true"
        className="text-xs"
      />

      {children}
    </button>
  );
}