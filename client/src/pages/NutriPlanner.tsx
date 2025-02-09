// pages/NutriPlanner.tsx


import { useInventory } from '@/api/inventory';
import { NutriPlannerComponent } from "@/components/NutriPlannerComponent";

export function NutriPlanner() {

  const { data: inventory = [], isLoading, error } = useInventory();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error)
    return <div className="text-red-500">Error loading data.</div>;
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">NutriPlanner 🥗</h1>
      <p className="text-gray-600">
        Get a personalized grocery list and meal recommendations based on your current inventory!
      </p>

      {isLoading ? (
        <p>Loading your inventory...</p>
      ) : (
        <NutriPlannerComponent purchasedProducts={inventory} />
      )}
    </div>
  );
}
