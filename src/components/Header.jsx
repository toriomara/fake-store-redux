"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LogIn, ShoppingCart, Store } from "lucide-react";
import { Button } from "./ui/button";
import { useActivePath } from "@/hooks/useActivePath";

export const Header = () => {
  const checkActivePath = useActivePath();
  const pages = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Cart", href: "/cart" },
  ];

  return (
    <header className="sticky top-0 bg-background border-stone-300 dark:border-stone-800 border-b z-20">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div>
            <Link className="flex text-2xl font-extrabold items-center gap-4" href="/">
              Fake Store <Store className="text-primary" />
            </Link>
          </div>
          {/* PAGES NAVI DESKTOP */}
          <div className="hidden md:flex gap-6">
            {pages.map((link) => (
              <Link
                className={`${
                  checkActivePath(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href={link.href}
                key={link.title}
              >
                {link.title}
              </Link>
            ))}
          </div>
          {/* 3rd BLOCK */}
          <div className="flex gap-4">
            {/* BUTTON OR USER MENU */}
            <div>
              <Link href="/login">
                <Button>
                  <LogIn /> Sign In
                </Button>
              </Link>
            </div>
            <div>
              <Button variant="ghost">
                <ShoppingCart />
              </Button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
