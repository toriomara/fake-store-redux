"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LogIn, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

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
                className={`text-lg hover:text-primary ${
                  pathname === item.href
                    ? " text-chart-3"
                    : "text-muted-foreground"
                }`}
                href={item.href}
                key={item.title}
              >
                {item.title}
              </Link>
            ))}
          </div>
          {/* 3rd BLOCK */}
          <div className="flex gap-4">
            {/* BUTTON OR USER MENU */}
            <div>
              <Button>
                <LogIn /> Sign In
              </Button>
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
