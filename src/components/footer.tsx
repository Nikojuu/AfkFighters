"use client";

import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const Footer = () => {
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  return pathname === "/" ? null : (
    <div className="flex  items-center flex-col">
      <Separator className="mt-8" />
      <small className="my-8">
        &copy; Copyright {currentYear}, Niko Lehtinen
      </small>
    </div>
  );
};

export default Footer;
