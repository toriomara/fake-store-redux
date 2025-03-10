"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const PageNotFound = () => {
  const { theme } = useTheme();

  return (
    <div className="page-container grid h-[90%] items-center justify-center">
      <div className="grid">
        <h1 className="text-6xl font-bold mb-6">Page Not Found</h1>
        <p className="text-3xl font-semibold mb-2">
          We could not find what you were looking for.
        </p>
        <p className="text-md mb-6">
          Please contact the owner of the site that linked you to the original
          URL and let them know their link is broken.
        </p>
        <div className="">
          <Link href="/">
            <Button variant="outline">Go Back Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
