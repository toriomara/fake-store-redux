"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
  const pathname = usePathname();
  return (
    <DrawerClose asChild>
      <Link
        className={`${
          pathname === link.href
            ? "text-primary text-lg"
            : "hover:text-primary-[300] text-lg"
        }`}
        href={link.href}
      >
        {link.title}
      </Link>
    </DrawerClose>
  );
};

export const MobileMenu = ({ links }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(max-width: 768px)");

  return (
    isDesktop && (
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="flex md:hidden" variant="ghost" size="icon">
            <Menu size={20} />
            <span className="sr-only">Мобильное меню</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="grid min-w-full sm:min-w-3/5 mx-auto xs:px-8 bottom-0 top-0 right-0 border-l">
          <DrawerHeader className="grid justify-end">
            {/* <ModeToggle /> */}
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X size={20} />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="grid gap-3 content-start justify-center p-4">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
            <DrawerClose asChild>
              {/* <SearchModalPage closeDrawer={() => setOpen(!open)} /> */}
            </DrawerClose>
          </div>
          <div className="p-4">
            <div className="mt-3 h-[120px]">
              <nav className="flex flex-col items-center">
                {links.map((link, index) => (
                  <div key={index} className="py-2">
                    {/* <NavLink href={link.href}>{link.title}</NavLink> */}
                    <NavLink link={link} />
                  </div>
                ))}
              </nav>
            </div>
          </div>
          <DrawerFooter className="flex-row justify-between">
            {/* <SocialIcons layout={"flex self-center"} />
          <PhoneBlock /> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  );
};

// export default MobileMenu;
