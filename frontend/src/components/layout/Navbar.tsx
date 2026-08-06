import Link from "next/link";

import Logo from "@/components/common/Logo";
import Button from "@/components/ui/Button";
import { NAV_ITEMS } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-zinc-700 transition-colors hover:text-blue-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button>Hire Me</Button>
      </nav>
    </header>
  );
}