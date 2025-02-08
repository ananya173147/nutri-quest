import api from './api';

export type LeaderboardEntry = {
  _id: string;
  username: string;
  points: number;
  sustainabilityScore: number;
  rank: number;
  avatar: string;
};

// Description: Get leaderboard entries
// Endpoint: GET /api/leaderboard
// Request: {}
// Response: { entries: LeaderboardEntry[] }
export const getLeaderboard = () => {
  return new Promise<{ entries: LeaderboardEntry[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        entries: [
          {
            _id: '1',
            username: 'EcoWarrior',
            points: 1500,
            sustainabilityScore: 95,
            rank: 1,
            avatar: '👨‍🌾'
          },
          {
            _id: '2',
            username: 'GreenGourmet',
            points: 1350,
            sustainabilityScore: 90,
            rank: 2,
            avatar: '👩‍🍳'
          },
          {
            _id: '3',
            username: 'SustainableChef',
            points: 1200,
            sustainabilityScore: 88,
            rank: 3,
            avatar: '🧑‍🍳'
          }
        ]
      });
    }, 500);
  });
};