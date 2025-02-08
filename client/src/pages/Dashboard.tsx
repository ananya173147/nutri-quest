import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, TrendingUp, Apple, Recycle } from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to NutriQuest</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Waste Prevented</CardTitle>
            <Recycle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 kg</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nutrition Score</CardTitle>
            <Apple className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78/100</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Organic Bananas</span>
                <span className="text-red-500">2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Whole Grain Bread</span>
                <span className="text-yellow-500">4 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Almond Milk</span>
                <span className="text-green-500">7 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Zero Waste Week</span>
                <span className="text-emerald-500">3 days left</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Local Produce Champion</span>
                <span className="text-emerald-500">5 days left</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Nutrition Master</span>
                <span className="text-emerald-500">7 days left</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}