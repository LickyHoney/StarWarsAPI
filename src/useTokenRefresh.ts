// useTokenRefresh.ts
import { useEffect, useState } from 'react';
import { refreshToken } from './AuthService';

const TOKEN_REFRESH_INTERVAL = 60000; // Refresh token every 60 seconds

const useTokenRefresh = (initialToken: string | null) => {
  const [token, setToken] = useState<string | null>(initialToken);

  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      if (token) {
        const newToken = await refreshToken(token);
        setToken(newToken);
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(refreshTokenInterval);
  }, [token]);

  return token;
};

export default useTokenRefresh;
