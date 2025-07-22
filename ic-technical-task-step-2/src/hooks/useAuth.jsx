import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [userId, setUserId] = useState('demoUser123');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    setIsAuthLoading(false);
  }, []);

  const authError = null;

  return { userId, authError, isAuthLoading };
};
