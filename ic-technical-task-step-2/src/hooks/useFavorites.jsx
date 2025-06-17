import { useState, useEffect, useCallback } from 'react';

export const useFavorites = (userId, searchCountry) => {

    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(false); 

    useEffect(() => {
      
        setIsLoadingFavorites(true);
        setError(null);
       
        setFavorites([]);
        setIsLoadingFavorites(false);
    }, [userId]);

    const toggleFav = useCallback(async (ws) => {
        if (!userId || !ws.hashedKhCode) {
            setError("Cannot update favorites. User or workshop data is missing.");
            return;
        }

        setError(null); 
        let updatedFavorites;

        const isFav = favorites.some(f => f.id === ws.hashedKhCode); 

        if (isFav) {

            updatedFavorites = favorites.filter(f => f.id !== ws.hashedKhCode);
        } else {
         
           const favoriteData = {
                id: ws.hashedKhCode,
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