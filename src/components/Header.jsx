"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  const pages = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Cart", href: "/cart" },
  ];

  const pathname = usePathname();

  return (
    <header className="sticky top-0 border-stone-300 dark:border-stone-800 border-b">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div>
            <Link className="text-xl font-extrabold" href="/">
              Fake Store
            </Link>
          </div>
          {/* PAGES NAVI DESKTOP */}
          <div className="hidden md:flex gap-6">
            {pages.map((item) => (
              <Link
                className={`hover:text-primary`}
                href={item.href}
                key={item.title}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
