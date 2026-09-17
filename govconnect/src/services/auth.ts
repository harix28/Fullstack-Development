import type { User, LoginCredentials, RegisterData } from '@/types';
import { mockUser } from '@/data/mockUser';

const TOKEN_KEY = 'govconnect_token';
const USER_KEY = 'govconnect_user';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const persistSession = (user: User, token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearSession = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// ─── Auth Service ─────────────────────────────────────────────────────────────

/**
 * Authenticate a user with email/mobile and password.
 * Returns the authenticated User object.
 * Throws if credentials are invalid.
 *
 * Future: POST to API_ENDPOINTS.auth.login
 */
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  await delay(800);

  const { emailOrMobile, password } = credentials;

  // Mock credential validation
  const isValidEmail =
    emailOrMobile === mockUser.email || emailOrMobile === mockUser.mobile;
  const isValidPassword = password.length >= 6;

  if (!isValidEmail || !isValidPassword) {
    throw new Error('Invalid email/mobile or password. Please try again.');
  }

  const mockToken = `mock_jwt_${Date.now()}`;
  persistSession(mockUser, mockToken);

  return { ...mockUser };
};

/**
 * Register a new user account.
 * Returns the newly created User object.
 *
 * Future: POST to API_ENDPOINTS.auth.register
 */
export const registerUser = async (data: RegisterData): Promise<User> => {
  await delay(1000);

  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match.');
  }

  const newUser: User = {
    ...mockUser,
    id: `user_${Date.now()}`,
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    state: data.state,
    district: data.district || mockUser.district,
    cityVillage: data.cityVillage || mockUser.cityVillage,
    dateOfBirth: data.dateOfBirth || '2001-01-01',
    age: data.age || mockUser.age,
    gender: (data.gender as User['gender']) || mockUser.gender,
    education: data.education || mockUser.education,
    occupation: data.occupation || mockUser.occupation,
    employmentStatus: data.employmentStatus || mockUser.employmentStatus,
    skills: data.skills || mockUser.skills,
    category: (data.category as any) || mockUser.category,
    annualIncome: data.annualIncome || mockUser.annualIncome,
    profileCompletion: 85,
    createdAt: new Date().toISOString(),
  };

  const mockToken = `mock_jwt_${Date.now()}`;
  persistSession(newUser, mockToken);

  return newUser;
};

/**
 * Log out the current user and clear local session data.
 *
 * Future: POST to API_ENDPOINTS.auth.logout
 */
export const logoutUser = (): void => {
  clearSession();
};

/**
 * Retrieve the currently authenticated user from localStorage.
 * Returns null if not authenticated.
 */
export const getCurrentUser = (): User | null => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    if (!token || !userJson) return null;
    return JSON.parse(userJson) as User;
  } catch {
    clearSession();
    return null;
  }
};

/**
 * Send a forgot-password request for the given email.
 * Returns a success message string.
 *
 * Future: POST to API_ENDPOINTS.auth.forgotPassword
 */
export const forgotPassword = async (email: string): Promise<string> => {
  await delay(600);

  if (!email || !email.includes('@')) {
    throw new Error('Please provide a valid email address.');
  }

  return `A password reset link has been sent to ${email}. Please check your inbox.`;
};

/**
 * Update the profile of the currently authenticated user.
 * Returns the updated User object.
 *
 * Future: PUT to API_ENDPOINTS.auth.profile
 */
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  await delay(700);

  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('User not authenticated.');
  }

  const updatedUser: User = {
    ...currentUser,
    ...data,
    id: currentUser.id,             // immutable
    email: currentUser.email,       // immutable
    createdAt: currentUser.createdAt, // immutable
  };

  // Recalculate a simple profile completion score
  const completionFields: (keyof User)[] = [
    'name', 'email', 'mobile', 'state', 'district', 'dateOfBirth',
    'gender', 'category', 'education', 'occupation', 'annualIncome',
    'familySize', 'avatar',
  ];
  const filledFields = completionFields.filter(
    (f) => updatedUser[f] !== undefined && updatedUser[f] !== '' && updatedUser[f] !== 0,
  ).length;
  updatedUser.profileCompletion = Math.round((filledFields / completionFields.length) * 100);

  const token = localStorage.getItem(TOKEN_KEY) || `mock_jwt_${Date.now()}`;
  persistSession(updatedUser, token);

  return updatedUser;
};
