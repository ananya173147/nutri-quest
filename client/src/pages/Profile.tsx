import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Star, Award } from "lucide-react"

export function Profile() {
  const achievements = [
    {
      id: 1,
      title: "Zero Waste Pioneer",
      description: "Prevented 50kg of food waste",
      icon: Trophy,
      color: "text-yellow-500"
    },
    {
      id: 2,
      title: "Sustainability Champion",
      description: "Maintained 90% eco-friendly purchases for a month",
      icon: Medal,
      color: "text-emerald-500"
    },
    {
      id: 3,
      title: "Nutrition Master",
      description: "Achieved perfect nutrition score for 2 weeks",
      icon: Star,
      color: "text-blue-500"
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+123 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <Award className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">Top 10%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Medal className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stats">
        <TabsList>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Food Waste Reduction</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Eco-friendly Purchases</span>
                  <span>72%</span>
                </div>
                <Progress value={72} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Nutrition Score</span>
                  <span>90%</span>
                </div>
                <Progress value={90} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="space-y-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardContent className="flex items-center space-x-4 py-4">
                <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                <div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  Earned
                </Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}