import { useEffect, useState } from "react"
import { useToast } from "@/hooks/useToast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"
import { LeaderboardEntry, getLeaderboard } from "@/api/leaderboard"

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const { entries } = await getLeaderboard()
        setEntries(entries)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        })
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [toast])

  const TopThree = () => (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {entries.slice(0, 3).map((entry, index) => (
        <Card key={entry._id} className={index === 0 ? "border-yellow-500" : index === 1 ? "border-gray-400" : "border-amber-600"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{index + 1}st Place</CardTitle>
            {index === 0 ? (
              <Trophy className="h-4 w-4 text-yellow-500" />
            ) : index === 1 ? (
              <Medal className="h-4 w-4 text-gray-400" />
            ) : (
              <Award className="h-4 w-4 text-amber-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{entry.avatar}</span>
              <div>
                <p className="text-xl font-bold">{entry.username}</p>
                <p className="text-sm text-muted-foreground">{entry.points} points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      
      <TopThree />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Sustainability Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell>#{entry.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{entry.avatar}</span>
                    <span>{entry.username}</span>
                  </div>
                </TableCell>
                <TableCell>{entry.points}</TableCell>
                <TableCell>{entry.sustainabilityScore}/100</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}