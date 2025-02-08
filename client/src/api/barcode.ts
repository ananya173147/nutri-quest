import api from './api';

// Description: Get product details from barcode
// Endpoint: GET /api/barcode/:barcode
// Request: { barcode: string }
// Response: { product: { product_name: string, nutriments: any, nutrition_grades: string } }
export const getProductFromBarcode = async (barcode: string) => {
  // Mocking the response
  return new Promise<{ product: any }>((resolve) => {
    setTimeout(() => {
      resolve({
        product: {
          code: barcode,
          product_name: "Organic Granola",
          brands: "Nature's Path",
          quantity: "400g",
          nutriments: {
            carbohydrates: 57.5,
            carbohydrates_100g: 57.5,
            carbohydrates_unit: "g",
            carbohydrates_value: 57.5,
            energy: 2255,
            "energy-kcal": 539,
            "energy-kcal_100g": 539,
            "energy-kcal_unit": "kcal",
            fat: 23.5,
            fat_100g: 23.5,
            fat_unit: "g",
            proteins: 12.3,
            proteins_100g: 12.3,
            proteins_unit: "g",
            sugars: 26.3,
            sugars_100g: 26.3,
            sugars_unit: "g",
            fiber: 8.5,
            fiber_100g: 8.5,
            fiber_unit: "g"
          },
          nutrition_grades: "b",
          sustainability_score: 85,
          eco_score: "a"
        }
      });
    }, 500);
  });
};