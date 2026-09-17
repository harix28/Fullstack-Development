/**
 * API Service Layer
 * 
 * This file acts as a stub for future API integration. 
 * Currently, it simulates asynchronous fetching of mock data.
 */

import { mockSchemes } from '../data/mockSchemes';

// Base API configuration (for future REST endpoints)
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const SchemeService = {
  getRecommended: async () => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSchemes), 500);
    });
  }
};

export const AuthService = {
  login: async (_credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ token: 'mock-jwt-token', user: { name: 'Citizen User' } }), 800);
    });
  }
};
