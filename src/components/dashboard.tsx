import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDashboardData } from "@/services/services";
import TrendinFighters from "./trending-fighters";
import RecentFighter from "./recent-fighter";

export async function Dashboard() {
  const {
    trendingFighters,
    fightHistory,
    totalAmountOfFights,
    biggestWinStreak,
    mostWins,
  } = await getDashboardData();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total amount of fights generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAmountOfFights}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Biggest winning spree
              </CardTitle>
              <Avatar>
                <AvatarImage src={`${biggestWinStreak.imgsrc}`} />
                <AvatarFallback>😱</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{biggestWinStreak.name}</div>
              <p className="text-xs text-muted-foreground pt-2">
                {biggestWinStreak.winstreak} wins in a row
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Most wins total
              </CardTitle>
              <Avatar>
                <AvatarImage src={`${mostWins.imgsrc}`} />
                <AvatarFallback>😱</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mostWins.name}</div>
              <p className="text-xs text-muted-foreground pt-2">
                {mostWins.totalwins} wins in total
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Elemenrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Avatar>
                  <AvatarImage src="/ice.jpg" />
                  <AvatarFallback>😱</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/fire.jpg" />
                  <AvatarFallback>😱</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/lightning.jpg" />
                  <AvatarFallback>😱</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/nature.jpg" />
                  <AvatarFallback>😱</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Fight history</CardTitle>
                <CardDescription>Recent results of fights</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fighters</TableHead>
                    <TableHead className="hidden xl:table-column"></TableHead>
                    <TableHead className="hidden xl:table-column"></TableHead>
                    <TableHead className="hidden xl:table-column"></TableHead>
                    <TableHead className="text-right">Date and time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fightHistory.map((fight) => (
                    <RecentFighter key={fight.id} fightInfo={fight} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Trending fighter</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {trendingFighters.map((fighter) => (
                <TrendinFighters fighter={fighter} key="" />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
