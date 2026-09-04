export interface NavChildItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  /**
   * When present, this item renders as a dropdown on desktop (hover/click to
   * reveal) and as an inline expandable group on mobile, instead of a plain
   * link. `href` is still used as the fallback destination if someone clicks
   * the parent label itself rather than one of the children.
   */
  children?: NavChildItem[];
}

/**
 * Skills / Experience / Projects / Services are all facets of "what I can
 * do and have done" — grouping them under one "Work" item keeps the top-level
 * nav to 5 items instead of 8, which reads as considered rather than busy.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/#home",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Work",
    href: "/projects",
    children: [
      { label: "Skills", href: "/skills" },
      { label: "Experience", href: "/experience" },
      { label: "Projects", href: "/projects" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    label: "Notes",
    href: "/#notes",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];