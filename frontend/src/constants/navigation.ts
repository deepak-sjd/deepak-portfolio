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
 * Skills and Projects are top-level nav items that jump to their homepage
 * sections (/#skills, /#projects) rather than separate pages. Experience,
 * Services, and Notes don't live on the homepage, so they stay grouped
 * under "Work" as their own standalone pages.
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
    label: "Skills",
    href: "/#skills",
  },
  {
    label: "Projects",
    href: "/#projects",
  },
  {
    label: "Work",
    href: "/experience",
    children: [
      { label: "Experience", href: "/experience" },
      { label: "Services", href: "/services" },
      { label: "Notes", href: "/notes" },
    ],
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];