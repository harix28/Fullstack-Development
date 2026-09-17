import { create } from 'zustand';
import { mockSchemes } from '../data/mockSchemes';

export const useStore = create((set) => ({
  user: null,
  savedSchemes: [],
  documents: [
    { id: 1, name: 'Aadhaar Card', type: 'Identity', date: 'Oct 12', status: 'Verified', iconType: 'blue' },
    { id: 2, name: 'Degree Certificate', type: 'Education', date: 'Oct 14', status: 'Processing', iconType: 'purple' },
  ],
  notifications: [
    { id: 1, type: 'scheme', title: 'Scheme Deadline Approaching', message: 'The PM Kisan scheme application closes in 5 days.', unread: true, time: '2 hours ago' },
    { id: 2, type: 'system', title: 'Profile Updated', message: 'Your Aadhaar document was successfully verified.', unread: false, time: '3 days ago' },
  ],

  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
  
  toggleSaveScheme: (schemeId) => set((state) => {
    const isSaved = state.savedSchemes.includes(schemeId);
    return {
      savedSchemes: isSaved 
        ? state.savedSchemes.filter(id => id !== schemeId)
        : [...state.savedSchemes, schemeId]
    };
  }),

  uploadDocument: (docName) => set((state) => ({
    documents: [
      ...state.documents,
      { id: Date.now(), name: docName, type: 'Uploaded', date: 'Just now', status: 'Processing', iconType: 'blue' }
    ]
  })),

  markNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, unread: false }))
  }))
}));
