import api from './api';

export type Product = {
  _id: string;
  name: string;
  expiryDate: string;
  quantity: number;
  sustainabilityScore: number;
  nutritionScore: number;
  category: string;
};

// Description: Get user's inventory
// Endpoint: GET /api/inventory
// Request: {}
// Response: { products: Product[] }
export const getInventory = () => {
  return new Promise<{ products: Product[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        products: [
          {
            _id: '1',
            name: 'Organic Bananas',
            expiryDate: '2024-04-10',
            quantity: 6,
            sustainabilityScore: 85,
            nutritionScore: 90,
            category: 'Fruits'
          },
          {
            _id: '2',
            name: 'Almond Milk',
            expiryDate: '2024-04-15',
            quantity: 2,
            sustainabilityScore: 70,
            nutritionScore: 75,
            category: 'Dairy Alternatives'
          },
          {
            _id: '3',
            name: 'Whole Grain Bread',
            expiryDate: '2024-04-05',
            quantity: 1,
            sustainabilityScore: 95,
            nutritionScore: 85,
            category: 'Bakery'
          }
        ]
      });
    }, 500);
  });
};

// Description: Add product to inventory
// Endpoint: POST /api/inventory
// Request: { product: Omit<Product, '_id'> }
// Response: { product: Product }
export const addProduct = (product: Omit<Product, '_id'>) => {
  return new Promise<{ product: Product }>((resolve) => {
    setTimeout(() => {
      resolve({
        product: {
          _id: Math.random().toString(),
          ...product
        }
      });
    }, 500);
  });
};

// Description: Remove product from inventory
// Endpoint: DELETE /api/inventory/:id
// Request: { id: string }
// Response: { success: boolean }
export const removeProduct = (id: string) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};