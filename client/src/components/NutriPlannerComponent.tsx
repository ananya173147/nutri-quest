import { useState } from "react";
import { getNutriPlan } from "@/api/gemini";
import { Button } from "@/components/ui/button";

interface NutriPlannerComponentProps {
  purchasedProducts: any[];
}

export function NutriPlannerComponent({ purchasedProducts }: NutriPlannerComponentProps) {
  const [nutriPlan, setNutriPlan] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const response = await getNutriPlan(purchasedProducts);
      setNutriPlan(response);
    } catch (error) {
      console.error("Error fetching nutri plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button onClick={handleGeneratePlan} disabled={loading}>
        {loading ? "Generating Plan..." : "Generate NutriPlanner 🍏"}
      </Button>

      {nutriPlan && (
        <div className="border p-4 rounded-md bg-gray-50">
          <h2 className="text-xl font-bold">Your AI-Generated NutriPlan</h2>
          {/* <pre className="whitespace-pre-wrap">{nutriPlan}</pre> */}
          <div
            className="mt-4 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: nutriPlan }}
          />
        </div>
      )}
    </div>
  );
}
