import api from './api';
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/challenges";

export type Challenge = {
  _id: string;
  title: string;
  description: string;
  points: number;
  deadline: string;
  completed: boolean;
  type: 'waste' | 'sustainability' | 'nutrition';
};

export const getChallenges = async (): Promise<{ challenges: Challenge[] }> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch challenges");
  }
};

// Mark a challenge as complete
export const completeChallenge = async (id: string): Promise<{ success: boolean; points?: number }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}/complete`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to complete challenge");
  }
};