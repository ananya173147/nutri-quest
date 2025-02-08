import api from './api';

export type Challenge = {
  _id: string;
  title: string;
  description: string;
  points: number;
  deadline: string;
  completed: boolean;
  type: 'waste' | 'sustainability' | 'nutrition';
};

// Description: Get active challenges
// Endpoint: GET /api/challenges
// Request: {}
// Response: { challenges: Challenge[] }
export const getChallenges = () => {
  return new Promise<{ challenges: Challenge[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        challenges: [
          {
            _id: '1',
            title: 'Zero Waste Week',
            description: 'Don\'t throw away any food for a week',
            points: 500,
            deadline: '2024-04-10',
            completed: false,
            type: 'waste'
          },
          {
            _id: '2',
            title: 'Local Produce Champion',
            description: 'Buy only local produce for 2 weeks',
            points: 300,
            deadline: '2024-04-15',
            completed: false,
            type: 'sustainability'
          },
          {
            _id: '3',
            title: 'Nutrition Master',
            description: 'Maintain a balanced diet for 5 days',
            points: 400,
            deadline: '2024-04-20',
            completed: false,
            type: 'nutrition'
          }
        ]
      });
    }, 500);
  });
};

// Description: Complete a challenge
// Endpoint: POST /api/challenges/:id/complete
// Request: { id: string }
// Response: { success: boolean, points: number }
export const completeChallenge = (id: string) => {
  return new Promise<{ success: boolean; points: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        points: 500
      });
    }, 500);
  });
};