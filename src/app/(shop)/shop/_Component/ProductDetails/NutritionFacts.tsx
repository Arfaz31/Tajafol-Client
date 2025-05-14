import { Leaf } from "lucide-react";

interface NutritionFactsProps {
  nutritionFacts?: {
    calories?: number;
    carbs?: number;
    protein?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    vitamins?: Array<{ name: string; percentage: number }>;
  };
}

export default function NutritionFacts({
  nutritionFacts,
}: NutritionFactsProps) {
  if (!nutritionFacts) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          Nutrition information for this product is currently being updated.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-background rounded-lg p-6">
        <h4 className="font-medium mb-4">Macronutrients</h4>
        <div className="space-y-3">
          {nutritionFacts.calories && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Calories</span>
                <span className="font-medium">
                  {nutritionFacts.calories} kcal
                </span>
              </div>
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (nutritionFacts.calories / 800) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {nutritionFacts.carbs && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Carbohydrates</span>
                <span className="font-medium">{nutritionFacts.carbs}g</span>
              </div>
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (nutritionFacts.carbs / 30) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {nutritionFacts.protein && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Protein</span>
                <span className="font-medium">{nutritionFacts.protein}g</span>
              </div>
              <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (nutritionFacts.protein / 5) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {nutritionFacts.fat && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fat</span>
                <span className="font-medium">{nutritionFacts.fat}g</span>
              </div>
              <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{
                    width: `${Math.min(100, (nutritionFacts.fat / 3) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {nutritionFacts.fiber && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fiber</span>
                <span className="font-medium">{nutritionFacts.fiber}g</span>
              </div>
              <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (nutritionFacts.fiber / 5) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {nutritionFacts.sugar && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Sugar</span>
                <span className="font-medium">{nutritionFacts.sugar}g</span>
              </div>
              <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (nutritionFacts.sugar / 20) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-background rounded-lg p-6">
        <h4 className="font-medium mb-4">Vitamins & Minerals</h4>
        <div className="space-y-4">
          {nutritionFacts.vitamins?.map((vitamin, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{vitamin.name}</span>
                <span className="font-medium">{vitamin.percentage}% DV</span>
              </div>
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${Math.min(100, vitamin.percentage)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="font-medium mb-3">Health Benefits</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Leaf className="h-4 w-4 text-secondary mt-0.5" />
              <span className="text-sm">
                Rich in essential vitamins and minerals
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Leaf className="h-4 w-4 text-secondary mt-0.5" />
              <span className="text-sm">Contains natural antioxidants</span>
            </li>
            <li className="flex items-start gap-2">
              <Leaf className="h-4 w-4 text-secondary mt-0.5" />
              <span className="text-sm">Supports immune system function</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
