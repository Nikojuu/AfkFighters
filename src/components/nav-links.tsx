"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  // pathname is the current path of the page /, /dashboard, /fight, /fighters
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 md:w-full md:justify-between">
      <div className="flex gap-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg mr-24 font-semibold md:text-base"
        >
          <span>Afk Fighters</span>
        </Link>
        {/* get pathname and update active stage depending on that */}
        <Link
          href="/dashboard"
          className={`${
            pathname === "/dashboard"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Dashboard
        </Link>
        <Link
          href="/fight"
          className={`${
            pathname === "/fight" ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Fight
        </Link>
        <Link
          href="/fighters"
          className={`${
            pathname === "/fighters"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          All fighters
        </Link>
        <Link
          href="/create-charter"
          className={`${
            pathname === "/create-charter"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Create new fighter
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default NavLinks;
