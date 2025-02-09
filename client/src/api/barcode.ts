import api from './api';

// Description: Get product details from barcode
// Endpoint: GET /api/barcode/:barcode
// Request: { barcode: string }
// Response: { product: { product_name: string, nutriments: any, nutrition_grades: string } }
export async function getProductFromBarcode(barcode: string) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v3/product/${barcode}.json`
    );
    if (!response.ok) throw new Error('Failed to fetch product');

    const data = await response.json();
    if (!data.product) throw new Error('Product not found');

    // Extract necessary fields
    return {
      name: data.product.product_name ?? '',
      sustainabilityScore: getScore(data.product.ecoscore_grade),
      nutritionScore: getScore(data.product.nutriscore_grade),
      calories: data.product.nutriments?.['energy-kcal']?.toString() ?? '',
      ingredients:
        data.product.ingredients?.map((ing: any) => ing.text).join(', ') ?? '',
      status: data.product.status ?? 'unknown',
      nutritionFacts: data.product.nutriments ?? {},
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

// Helper function to convert grades to scores
function getScore(grade: string): number {
  const scores: Record<string, number> = { a: 100, b: 80, c: 60, d: 40, e: 20 };
  return scores[grade] ?? 0;
}
