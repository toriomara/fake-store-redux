// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useCallback, useEffect, useState } from "react";
// import { Button } from "./ui/button";

// export const ThemeToggle = () => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     const preferDark = window.matchMedia("(prefers-color-theme: dark)").matches;

//     if (storedTheme === "dark" || (!storedTheme && preferDark)) {
//       setTheme("dark");
//       document.documentElement.classList.add("dark");
//     } else {
//       setTheme("light");
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const handleToggle = useCallback(() => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   }, [setTheme, theme]);

//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       aria-label="Toggle theme"
//       onClick={handleToggle}
//     >
//       {theme === "light" ? <Moon /> : <Sun />}
//     </Button>
//   );
// };

// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export function ThemeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild className="cursor-pointer ">
//         <Button variant="ghost" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="background-green-300" align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import { useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { IoMoonOutline } from "react-icons/io5";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  // For devs only. Remove in prod
  const handleModeToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  useEffect(() => {
    function toggleModeByKeys(evt) {
      if (evt.ctrlKey && evt.keyCode === 81) {
        handleModeToggle();
      }
    }
    document.addEventListener("keydown", toggleModeByKeys);
    return () => {
      document.removeEventListener("keydown", toggleModeByKeys);
    };
  }, [handleModeToggle, theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Переключение темы сайта</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};