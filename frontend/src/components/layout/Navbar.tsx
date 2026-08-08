"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import Logo from "@/components/common/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/common/ThemeToggle";

import { NAV_ITEMS } from "@/constants/navigation";
import useActiveSection from "@/hooks/useActiveSection";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/60 bg-white/80 shadow-lg backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Deepak Kumar - Home"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-7 md:flex lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-md py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}

                  {/* Active indicator */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-400 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          <Link href="#contact">
            <Button>Hire Me</Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition-all duration-300 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
          >
            {mobileMenuOpen ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        className={`border-t border-zinc-200/60 bg-white/95 backdrop-blur-xl transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950/95 md:hidden ${
          mobileMenuOpen
            ? "visible max-h-[calc(100vh-5rem)] opacity-100"
            : "invisible max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl overflow-y-auto px-6 py-6">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleMobileLinkClick}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                        : "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <Link
              href="#contact"
              onClick={handleMobileLinkClick}
              className="block"
            >
              <Button className="w-full">Hire Me</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}