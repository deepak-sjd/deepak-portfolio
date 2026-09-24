export default function Logo() {
  return (
    <div className="flex items-center gap-1.5">
      {/*
        Signature mark: a flowing script "D", like a hand-signed initial —
        a compact personal mark rather than spelling the name out twice.
        Slight counter-rotation gives it a written-with-a-pen feel instead
        of sitting perfectly level next to the block wordmark.
      */}
      <span
        aria-hidden="true"
        className="
          -mr-0.5 -rotate-6 text-3xl leading-none text-blue-600
          dark:text-blue-400
        "
        style={{ fontFamily: "var(--font-signature)" }}
      >
        D
      </span>

      <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Deepak
        <span className="text-blue-600 dark:text-blue-400">.</span>
      </span>
    </div>
  );
}
