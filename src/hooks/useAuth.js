import { useCallback } from 'react';
import { mockPost } from './apiClient';

// Mock auth state stored in memory for now
let currentUser = null;

export function useAuth() {
  const login = useCallback(async (email, password) => {
    // TODO: Connect POST /api/login
    await mockPost('/login', { email, password });
    currentUser = { id: 'u1', name: 'Siri', email };
    return true;
  }, []);

  const signup = useCallback(async (email, password, name) => {
    // TODO: Connect POST /api/signup
    await mockPost('/signup', { email, password, name });
    currentUser = { id: 'u1', name, email };
    return true;
  }, []);

  const logout = useCallback(async () => {
    // TODO: Connect POST /api/logout
    currentUser = null;
    return true;
  }, []);

  const getUser = useCallback(() => currentUser, []);

  return { login, signup, logout, getUser };
}


