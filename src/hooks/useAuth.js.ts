import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  sessionToken: string | null;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegistrationData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  state_of_origin: string;
  property_type: string;
  password: string;
}

const API_BASE_URL = 'https://hausing-api-production.up.railway.app/api';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    sessionToken: null,
    isLoading: false,
    error: null
  });

  // Generate session token
  const generateSessionToken = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  // Save user data to storage
  const saveUserData = useCallback((userData: User, sessionToken: string) => {
    localStorage.setItem('teacher_data', JSON.stringify(userData));
    sessionStorage.setItem('teacher_session', sessionToken);

    setAuthState({
      isAuthenticated: true,
      user: userData,
      sessionToken,
      isLoading: false,
      error: null
    });
  }, []);

  // Clear user data from storage
  const clearUserData = useCallback(() => {
    localStorage.removeItem('teacher_data');
    sessionStorage.removeItem('teacher_session');

    setAuthState({
      isAuthenticated: false,
      user: null,
      sessionToken: null,
      isLoading: false,
      error: null
    });
  }, []);

  // Fetch user profile from API
  const fetchUserProfile = useCallback(async (sessionToken: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid, clear storage
          clearUserData();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch profile');
      }

      const userData = await response.json();

      if (userData) {
        setAuthState((prev) => ({ ...prev, isAuthenticated: true, user: userData }));
      }

      // Update stored user data with fresh data from API
      //saveUserData(userData, sessionToken);

      return userData;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile'
      }));
      throw error;
    }
  }, [saveUserData, clearUserData]);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('teacher_data');
      const sessionToken = sessionStorage.getItem('teacher_session');

      if (savedUser && sessionToken) {
        try {
          // Try to fetch fresh profile data from API
          await fetchUserProfile(sessionToken);
          setAuthState((prev) => ({ ...prev, sessionToken }));
        } catch (error) {
          // If API call fails, try to use saved data
          try {
            const user = JSON.parse(savedUser);
            setAuthState({
              isAuthenticated: true,
              user,
              sessionToken,
              isLoading: false,
              error: null
            });
          } catch (parseError) {
            clearUserData();
          }
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, [fetchUserProfile, clearUserData]);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const result = await response.json();
      const sessionToken = result.token || generateSessionToken();

      // Save user data
      saveUserData(result.user, sessionToken);
      setAuthState(prev => ({ ...prev, isAuthenticated: false, isLoading: false, error: null }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, [saveUserData]);

  // Register function
  const register = useCallback(async (registrationData: RegistrationData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registrationData,
          phone: `+234${registrationData.phone}`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();

      const sessionToken = result?.token || generateSessionToken();

      // Save user data
      saveUserData(result?.user, sessionToken);

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, [saveUserData]);

  // Logout function
  const logout = useCallback(() => {
    clearUserData();
  }, [clearUserData]);

  // Update profile function
  const updateProfile = useCallback(async (updatedData: Partial<RegistrationData>) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // if (!authState.sessionToken) {
      //   throw new Error('No active session');
      // }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authState.sessionToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const result = await response.json();

      // Update stored user data
      if (authState.user) {
        const updatedUser = { ...authState.user, ...result };
        saveUserData(updatedUser, authState.sessionToken);
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, [authState.sessionToken, authState.user, saveUserData]);

  // Check if user has submitted form (helper function)
  const hasSubmittedForm = useCallback(() => {
    return authState.isAuthenticated && authState.user !== null;
  }, [authState.isAuthenticated, authState.user]);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (authState.sessionToken) {
      return await fetchUserProfile(authState.sessionToken);
    }
    throw new Error('No active session');
  }, [authState.sessionToken, fetchUserProfile]);

  return {
    // State
    authState,
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,

    // Helpers
    hasSubmittedForm,
  };
};
