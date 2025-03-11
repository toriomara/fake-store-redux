import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="py-6 border-t border-stone-300 dark:border-stone-800">
      <div className="container mx-auto px-4 sm:flex justify-between">
        <div>© {new Date().getFullYear()} Fake Store. All rights reserved</div>
        <div className="flex gap-2">
          Made by{" "}
          <a
            className="flex items-center gap-1 hover:text-primary hover:underline decoration-1 underline-offset-4 transform transition-all duration-300"
            href="https://telegram.me/toriomara"
            target="_blank"
          >
            Vladimir Budkevich
            <SquareArrowOutUpRight size={16} className="" />
          </a>
        </div>
      </div>
    </footer>
  );
};
