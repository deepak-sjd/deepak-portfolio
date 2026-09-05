"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

import Logo from "@/components/common/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/common/ThemeToggle";

import { NAV_ITEMS } from "@/constants/navigation";
import useActiveSection from "@/hooks/useActiveSection";
import useHashLinkClick from "@/hooks/useHashLinkClick";

/**
 * Some nav links are homepage anchors ("/#about" — only ever "active" while
 * actually on "/" and scrolled to that section), others are real standalone
 * routes ("/skills" — active purely by pathname match). This tells the two
 * apart from the href itself so the rest of the component doesn't need to
 * care which kind of link it's rendering.
 */
function isItemActive(href: string, pathname: string, activeSection: string): boolean {
  if (href.includes("#")) {
    const hash = href.split("#")[1] ?? "";
    return pathname === "/" && activeSection === hash;
  }
  return pathname === href;
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Which top-level dropdown is open on desktop ("Work"), null = none.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Which group is expanded in the mobile menu ("Work"), null = collapsed.
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const activeSection = useActiveSection();
  const handleHashLinkClick = useHashLinkClick(pathname);

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
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close an open desktop dropdown on any click outside the nav.
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

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
    setOpenMobileGroup(null);
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
        ref={navRef}
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
            const hasChildren = !!item.children?.length;
            const isActive = hasChildren
              ? item.children!.some((c) => isItemActive(c.href, pathname, activeSection))
              : isItemActive(item.href, pathname, activeSection);
            const isDropdownOpen = openDropdown === item.label;

            if (!hasChildren) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleHashLinkClick(e, item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative rounded-md py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-400 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            }

            // Dropdown item ("Work") — opens on hover (desktop pointer) and
            // on click (trackpads / touch laptops without true hover), closes
            // on outside click, Escape, or picking a child link.
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === item.label ? null : item.label))
                  }
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  className={`relative flex items-center gap-1 rounded-md py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    size={14}
                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-400 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      {item.children!.map((child) => {
                        const isChildActive = isItemActive(child.href, pathname, activeSection);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                              isChildActive
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                : "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          <Link href="/#contact" onClick={(e) => handleHashLinkClick(e, "/#contact")}>
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
              const hasChildren = !!item.children?.length;
              const isActive = hasChildren
                ? item.children!.some((c) => isItemActive(c.href, pathname, activeSection))
                : isItemActive(item.href, pathname, activeSection);
              const isGroupOpen = openMobileGroup === item.label;

              if (!hasChildren) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleHashLinkClick(e, item.href);
                        handleMobileLinkClick();
                      }}
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
              }

              // "Work" as an inline expandable group — same drill-down
              // pattern as the Notes sidebar, so it feels consistent with
              // the rest of the site rather than a one-off widget.
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileGroup((prev) => (prev === item.label ? null : item.label))
                    }
                    aria-expanded={isGroupOpen}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                        : "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      size={16}
                      className={`transition-transform duration-200 ${isGroupOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isGroupOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeInOut" }}
                        className="overflow-hidden pl-3"
                      >
                        {item.children!.map((child) => {
                          const isChildActive = isItemActive(child.href, pathname, activeSection);
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={handleMobileLinkClick}
                                tabIndex={mobileMenuOpen && isGroupOpen ? 0 : -1}
                                className={`block rounded-xl px-4 py-2.5 text-[15px] font-medium transition-all duration-200 ${
                                  isChildActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <Link
              href="/#contact"
              onClick={(e) => {
                handleHashLinkClick(e, "/#contact");
                handleMobileLinkClick();
              }}
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
