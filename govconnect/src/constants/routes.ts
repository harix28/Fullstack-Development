// Application route constants

export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Dashboard
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',

  SCHEMES: '/dashboard/schemes',
  SCHEMES_RECOMMENDED: '/dashboard/schemes/recommended',
  SCHEMES_EXPLORE: '/dashboard/schemes/explore',
  SCHEME_DETAIL: (id: string) => `/dashboard/schemes/${id}`,

  JOBS: '/dashboard/jobs',
  JOBS_RECOMMENDED: '/dashboard/jobs/recommended',
  JOB_DETAIL: (id: string) => `/dashboard/jobs/${id}`,

  DOCUMENTS: '/dashboard/documents',

  GRIEVANCES: '/dashboard/grievances',
  GRIEVANCE_NEW: '/dashboard/grievances/new',
  GRIEVANCE_DETAIL: (id: string) => `/dashboard/grievances/${id}`,

  ASSISTANT: '/dashboard/assistant',
  NOTIFICATIONS: '/dashboard/notifications',
  SETTINGS: '/dashboard/settings',
} as const;

export default ROUTES;
