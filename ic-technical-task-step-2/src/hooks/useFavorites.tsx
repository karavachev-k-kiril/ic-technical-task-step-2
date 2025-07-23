import { useState, useEffect, useCallback } from 'react';
import { Workshop } from '../constants/types';

interface FavoritesHook {
    favorites: Workshop[];
    toggleFav: (ws: Workshop) => void;
    favoritesError: string | null;
    isLoadingFavorites: boolean;
    setFavoritesError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useFavorites = (userId: string | null, searchCountry: string): FavoritesHook => {
    const [favorites, setFavorites] = useState<Workshop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState<boolean>(false);

    useEffect(() => {
        if (!userId) return;
        
        setIsLoadingFavorites(true);
        setError(null);
        setFavorites([]);
        setIsLoadingFavorites(false);
    }, [userId]);

    const toggleFav = useCallback(async (ws: Workshop) => {
        if (!userId || !ws.hashedKhCode) {
            setError("Cannot update favorites. User or workshop data is missing.");
            return;
        }

        setError(null); 
        let updatedFavorites: Workshop[];

        const isFav = favorites.some(f => f.hashedKhCode === ws.hashedKhCode); 

        if (isFav) {

            updatedFavorites = favorites.filter(f => f.hashedKhCode !== ws.hashedKhCode);
        } else {

           const favoriteData: Workshop = {
                name: ws.name,
                slug: ws.slug,
                hashedKhCode: ws.hashedKhCode,
                address: ws.address || null,
                image: ws.image || null,
                countryCode: searchCountry,
                phoneNumber: ws.phoneNumber || null, 
                reviews: ws.reviews || null,         
            };
            updatedFavorites = [...favorites, favoriteData];
        }

        setFavorites(updatedFavorites);
    }, [userId, favorites, searchCountry]); 

    return { favorites, toggleFav, favoritesError: error, isLoadingFavorites, setFavoritesError: setError };
};