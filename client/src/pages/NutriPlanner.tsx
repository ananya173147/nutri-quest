// pages/NutriPlanner.tsx

import { useState, useEffect } from "react";
import { getInventory } from "@/api/inventory";
import { NutriPlannerComponent } from "@/components/NutriPlannerComponent";
import { Button } from "@/components/ui/button";

export function NutriPlanner() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const { inventories } = await getInventory();
        setProducts(inventories);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">NutriPlanner 🥗</h1>
      <p className="text-gray-600">
        Get a personalized grocery list and meal recommendations based on your current inventory!
      </p>

      {loading ? (
        <p>Loading your inventory...</p>
      ) : (
        <NutriPlannerComponent purchasedProducts={products} />
      )}
    </div>
  );
}
