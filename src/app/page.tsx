import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SparklesHero } from "@/components/ui/sparkles-hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <SparklesHero />
      <div className="flex justify-center gap-12">
        <Button asChild>
          <Link href="/fight">Start Fighting</Link>
        </Button>
        <Button asChild variant={"outline"}>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Footer />
      </div>
    </main>
  );
}
