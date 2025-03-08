import React from "react";

export const Footer = () => {
  return (
    <footer className="py-6 border-t border-stone-300 dark:border-stone-800">
      <div className="container mx-auto px-4 sm:flex justify-between">
        <div>© {new Date().getFullYear()} Fake Store. All rights reserved</div>
        <div>Made by Vladimir Budkevich</div>
      </div>
    </footer>
  );
};
