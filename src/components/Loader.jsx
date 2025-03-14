"use client";

import { useTheme } from "next-themes";

export const Loader = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`w-12 h-12 border-4 ${
          theme === "dark" ? "border-primary" : "border-primary"
        } border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

