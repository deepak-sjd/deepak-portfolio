"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonProps =
  | (BaseButtonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
      })
  | (BaseButtonProps &
      AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      });

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110 shadow-[0_8px_24px_-8px_var(--accent)]",
  secondary:
    "bg-transparent text-[var(--ink)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost:
    "bg-transparent text-[var(--muted)] hover:text-[var(--accent)]",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-display text-sm font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50";

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = "primary",
    className = "",
    children,
  } = props;

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={styles}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement> &
    BaseButtonProps & { href?: never };

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={styles}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;