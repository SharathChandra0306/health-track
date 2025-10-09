import { useCallback } from 'react';
import { mockGet, mockPost } from './apiClient';

let mockUser = {
  id: 'u1',
  name: 'Siri',
  email: 'siri@example.com',
  phone: '+1 555-0100'
};

export function useUser() {
  const getUser = useCallback(() => mockUser, []);

  const fetchUser = useCallback(async () => {
    // TODO: Replace mock response with real API call to GET /api/user
    await mockGet('/user');
    return mockUser;
  }, []);

  const updateUser = useCallback(async (updates) => {
    // TODO: Replace with PUT /api/user
    await mockPost('/user', updates);
    mockUser = { ...mockUser, ...updates };
    return mockUser;
  }, []);

  return { getUser, fetchUser, updateUser };
}


