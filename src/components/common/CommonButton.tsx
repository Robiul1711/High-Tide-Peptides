"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";

type AsType = "button" | "a" | "link";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  as?: AsType;
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type LinkProps = BaseProps & {
  as: "link";
  to: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export type CommonButtonProps = ButtonProps | AnchorProps | LinkProps;

const CommonButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CommonButtonProps
>(({ children, onClick, className = "", as = "button", ...rest }, ref) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<any>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  const classes = `
    relative overflow-hidden px-6 py-2 font-semibold rounded-lg 
    transition-colors ${className}
  `;

  const rippleContent = ripples.map((r) => (
    <span
      key={r.id}
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        left: r.x,
        top: r.y,
        width: 20,
        height: 20,
        transform: "translate(-50%, -50%)",
        opacity: 0.6,
        animation: "ripple 0.6s ease-out",
      }}
    />
  ));

  /* --- RENDER LOGIC --- */

  if (as === "a") {
    const { href, ...anchorProps } = rest as AnchorProps;
    return (
      <>
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={handleClick}
          className={classes}
        >
          {rippleContent}
          {children}
        </a>
      </>
    );
  }

  if (as === "link") {
    const { to, ...linkProps } = rest as LinkProps;
    return (
      <>
        <Link
          {...linkProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          onClick={handleClick}
          className={classes}
        >
          {rippleContent}
          {children}
        </Link>
      </>
    );
  }

  return (
    <>
      <button
        {...(rest as ButtonProps)}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={handleClick}
        className={classes}
      >
        {rippleContent}
        {children}
      </button>
    </>
  );
});

export default CommonButton;
