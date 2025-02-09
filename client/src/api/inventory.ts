import api from './api';
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/inventory";

export type Product = {
  _id: string;
  name: string;
  expiryDate: string;
  quantity: number;
  sustainabilityScore: number;
  nutritionScore: number;
  category: string;
  calories: string;
  ingredients: string;
  status: string;
  nutritionFacts: string;
};

// Description: Get user's inventory
// Endpoint: GET /api/inventory
// Request: {}
// Response: { products: Product[] }
export const getInventory = async (): Promise<{ inventories: Product[] }> => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch challenges");
  }
};

// Description: Add product to inventory
// Endpoint: POST /api/inventory
// Request: { product: Omit<Product, '_id'> }
// Response: { product: Product }
export const addProduct = (inventories: Omit<Product, '_id'>) => {
  return new Promise<{ inventories: Product }>((resolve) => {
    setTimeout(() => {
      resolve({
        inventories: {
          _id: Math.random().toString(),
          ...inventories
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