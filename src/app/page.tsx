import { Button } from "@/components/ui/button";
import ShinyButton from "@/components/ui/shiny-button";
import { SparklesHero } from "@/components/ui/sparkles-hero";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-screen z-50 relative ">
        <SparklesHero />
        <div className="flex justify-center gap-12 z-20">
          <Link href="/fight">
            <ShinyButton />
          </Link>
          <Button asChild variant={"outline"}>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        <h2 className=" text-center container mx-auto relative text text-xl  font-bold text-slate-50 opacity-80 mt-24">
          <span className="text-4xl">&#x201C;</span>
          Welcome to Afk Fighters,
          <br />
          where cute critters clash for absolutely no reason in the cosmic
          vortex of space.
          <br />
          Fighting lasts for eternity in an endless loop of time.
          <span className="text-4xl">&#x201D;</span>
        </h2>
      </main>
    </>
  );
}
