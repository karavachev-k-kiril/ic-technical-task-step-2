import { useState, useEffect } from 'react';


interface AuthHook {
    userId: string | null;
    authError: string | null;
    isAuthLoading: boolean;
}

export const useAuth = (): AuthHook => {
    const [userId, setUserId] = useState<string | null>('demoUser123');
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

    const authError: string | null = null;

    useEffect(() => {

        setIsAuthLoading(false);
    }, []);

    return { userId, authError, isAuthLoading };
};