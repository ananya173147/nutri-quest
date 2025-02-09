import api from './api';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:3000/api/inventory';

export type Product = {
  name: string; //product_name
  expiryDate: string; // user entered in form
  quantity: number; // user entered in form
  sustainabilityScore: number; //ecoscore_grade -> a: 100, b: 80, c: 60, d: 40, e: 20
  nutritionScore: number; //nutriscore_grade -> a: 100, b: 80, c: 60, d: 40, e: 20
  category: string; // user entered in form
  calories: string; //energy-kcal
  ingredients: string; //ingredients -> array of objects
  status: string; // status -> known
  nutritionFacts: string; // nutriments -> object
};

// Fetch inventory
export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const response = await axios.get<{ inventories: Product[] }>(
        API_BASE_URL
      );
      return response.data.inventories;
    },
  });
};

// Add product mutation
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<Product, '_id'>) => {
      const response = await axios.post(API_BASE_URL, product);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:3000/api/inventory/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};
