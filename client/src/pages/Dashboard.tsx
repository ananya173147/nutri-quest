import { useInventory } from '@/api/inventory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Leaf, Apple } from 'lucide-react';

export function Dashboard() {
  const { data: inventory = [], isLoading, error } = useInventory();

  // Filter out items with a score of 0 before calculating the average
  const validNutritionItems = inventory.filter(
    (item) => item.nutritionScore > 0
  );
  const validSustainabilityItems = inventory.filter(
    (item) => item.sustainabilityScore > 0
  );

  // Calculate average scores only for items with valid scores
  const averageNutritionScore =
    validNutritionItems.length > 0
      ? validNutritionItems.reduce(
          (sum, item) => sum + item.nutritionScore,
          0
        ) / validNutritionItems.length
      : 0;

  const averageSustainabilityScore =
    validSustainabilityItems.length > 0
      ? validSustainabilityItems.reduce(
          (sum, item) => sum + item.sustainabilityScore,
          0
        ) / validSustainabilityItems.length
      : 0;

  // Get today's date and filter items expiring within 7 days
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);

  const expiringSoon = inventory.filter(
    (item) =>
      new Date(item.expiryDate) >= today &&
      new Date(item.expiryDate) <= sevenDaysLater
  );

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error)
    return <div className="text-red-500">Error loading dashboard data.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to NutriQuest</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Sustainability Score Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sustainability Score
            </CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageSustainabilityScore.toFixed(1)}/100
            </div>
            <Progress value={averageSustainabilityScore} className="mt-2" />
          </CardContent>
        </Card>

        {/* Nutrition Score Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nutrition Score
            </CardTitle>
            <Apple className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageNutritionScore.toFixed(1)}/100
            </div>
            <Progress value={averageNutritionScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Expiring Soon Section */}
        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            {expiringSoon.length > 0 ? (
              <div className="space-y-2">
                {expiringSoon.map((item) => {
                  const daysRemaining = Math.ceil(
                    (new Date(item.expiryDate).getTime() - today.getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <span
                        className={
                          daysRemaining <= 2
                            ? 'text-red-500'
                            : daysRemaining <= 5
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }
                      >
                        {daysRemaining} days
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">No items expiring soon.</p>
            )}
          </CardContent>
        </Card>

        {/* Active Challenges Section */}
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
  );
}
