"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LogIn, ShoppingCart, Store } from "lucide-react";
import { Button } from "./ui/button";
import { useActivePath } from "@/hooks/useActivePath";
import { useSelector } from "react-redux";
import { MobileMenu } from "./MobileMenu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Badge } from "./ui/badge";
import { Logout } from "./Logout";

const pages = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Cart", href: "/cart" },
];

export const Header = () => {
  const isXs = useMediaQuery("(min-width: 540px)");
  const checkActivePath = useActivePath();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cart = useSelector((state) => state.cart.items);
  const itemQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 bg-background border-stone-300 dark:border-stone-800 border-b z-20">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <div>
            <Link
              className="flex text-2xl font-extrabold items-center gap-4"
              href="/"
            >
              Fake Store <Store className="text-primary" />
            </Link>
          </div>
          {/* PAGES NAVI DESKTOP */}
          <nav className="hidden md:flex gap-6">
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
            {isAuthenticated && (
              <Link
                className={`${
                  checkActivePath("/admin")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href="/admin"
              >
                Admin
              </Link>
            )}
          </nav>
          {/* 3rd BLOCK */}
          <div className="flex items-center gap-4">
            {isXs && (
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <Logout />
                ) : (
                  <Link href="/login">
                    <Button className="font-semibold">
                      <LogIn /> Sign In
                    </Button>
                  </Link>
                )}
                <Link href="/cart">
                  <Button variant="ghost">
                    <ShoppingCart />
                    {cart.length > 0 && (
                      <Badge
                        className="relative -top-2 right-3 h-3 w-3 rounded-[25%] flex items-center justify-center p-0 text-[11px]"
                        variant="destructive"
                      >
                        {itemQuantity}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <ThemeToggle />
              </div>
            )}
            <MobileMenu links={pages} />
          </div>
        </div>
      </div>
    </header>
  );
};
