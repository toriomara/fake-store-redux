"use client";

import React from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LogIn, LogOut, ShoppingCart, Store } from "lucide-react";
import { Button } from "./ui/button";
import { useActivePath } from "@/hooks/useActivePath";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import MobileMenu from "./MobileMenu";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const pages = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Cart", href: "/cart" },
];

export const Header = () => {
  // const path = usePathname();
  const isXs = useMediaQuery("(min-width: 540px)");
  const checkActivePath = useActivePath();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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
                  <Button
                    className="font-semibold"
                    onClick={handleLogout}
                    size="sm"
                  >
                    <LogOut /> Sign Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="font-semibold">
                      <LogIn /> Sign In
                    </Button>
                  </Link>
                )}
                <Button variant="ghost">
                  <ShoppingCart />
                </Button>
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
