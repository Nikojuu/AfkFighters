import Link from "next/link";
import { Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <div className="flex  w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
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
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/fight"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Fight
            </Link>
            <Link
              href="/all-fighers"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              All fighters
            </Link>
          </div>
          <ThemeToggle />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Fight
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                All Fighters
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
