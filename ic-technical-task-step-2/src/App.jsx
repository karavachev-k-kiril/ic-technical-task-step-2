import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './hooks/useAuth';
import { useWorkshops } from './hooks/useWorkshops';
import { useFavorites } from './hooks/useFavorites';
import Filters from './components/Filters/Filters';
import WorkshopCard from './components/WorkshopCard/WorkshopCard';
import Pagination from './components/Pagination/Pagination';
import CarFinderIcon from './components/UI/Icons/CarFinderIcon';
import FavoritesDrawer from './components/FavoritesDrawer/FavoritesDrawer';
import Spinner from './components/UI/Spinner/Spinner';
import MessageDialog from './components/UI/MessageDialog/MessageDialog';

import './App.css';

export default function App() {

    const [selectedCountry, setSelectedCountry] = useState('PL');
    const [perPage, setPerPage] = useState('10');
    const [selectedAvailability, setSelectedAvailability] = useState('-');
    const [selectedBrand, setSelectedBrand] = useState('-');
    const [searchQuery, setSearchQuery] = useState('');
    const { userId, authError, isAuthLoading } = useAuth();
    const {
        isLoading: isWorkshopsLoading,
        workshops,
        pagination,
        availableFilters,
        searchParams,
        setSearchParams,
        workshopsError,
        loadMoreWorkshops,
        isFetchingMore,
        hasMore
    } = useWorkshops('PL', 1, '10');
    const { favorites, toggleFav, favoritesError, setFavoritesError } = useFavorites(userId, searchParams.country);


    const isLoading = isAuthLoading || isWorkshopsLoading;
    const [errorMessage, setErrorMessage] = useState('');


    const bottomRef = useRef(null);


    useEffect(() => {
        const error = authError || workshopsError || favoritesError;
        if (error) {
            setErrorMessage(error);
            
            if (favoritesError) setFavoritesError(null);
        }
    }, [authError, workshopsError, favoritesError, setFavoritesError]);
    useEffect(() => {
      
        if (searchParams.perPage !== 'All' || !bottomRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                
                
 if (entries[0].isIntersecting && hasMore && !isFetchingMore && !isWorkshopsLoading) {
                    loadMoreWorkshops();
                }
            },
            {
                root: null,
               
                 rootMargin: '0px',
                threshold: 0.1,
            }
        );

        observer.observe(bottomRef.current);

        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            
 }
        };
    }, [
        bottomRef.current,
        searchParams.perPage,
        hasMore,
        isFetchingMore,
        isWorkshopsLoading,
        loadMoreWorkshops
    ]);
 const handleSearch = () => {
        setSearchParams({
            country: selectedCountry,
            perPage: perPage,
            page: 1,
            availability: selectedAvailability,
            brand: selectedBrand,
            query: searchQuery,
        });
 };

    const handlePerPageChange = (value) => {
        setPerPage(value);
 setSearchParams(prev => ({ ...prev, perPage: value, page: 1 }));
    };
 const handlePageChange = (newPage) => {
        setSearchParams(prev => ({ ...prev, page: newPage }));
 }

    if (isAuthLoading) {
        return (
            <div className="initial-loading-container">
                <Spinner />
                <p className="initial-loading-text">Initializing...</p>
            </div>
        );
 }

    return (
        <div className="app">
            <MessageDialog message={errorMessage} onClose={() => setErrorMessage('')} />
            <header className="app-header">
                <div className="container header-content">
                    <div id="car-finder-header-and-icon">
                        <CarFinderIcon />
                        <h1 className="header-title">Car Workshop Finder</h1>
                    </div>
      {userId && <p className="user-id">User ID: {userId}</p>}
                </div>
            </header>

            <main className="container main-content">
                <Filters
                    country={selectedCountry}
            
         perPage={perPage}
                    availability={selectedAvailability}
                    brand={selectedBrand}
                    brandOptions={availableFilters.brands}
                    searchQuery={searchQuery}
                    onCountryChange={setSelectedCountry}
            
         onPerPageChange={handlePerPageChange}
                    onAvailabilityChange={setSelectedAvailability}
                    onBrandChange={setSelectedBrand}
                    onSearchQueryChange={setSearchQuery}
                    onSearch={handleSearch}
                    isLoading={isLoading}
            
     />

                {isLoading && searchParams.perPage !== 'All' && (
                    <Spinner />
                )}

                {!isLoading && workshops.length === 0 && !workshopsError && (
             
        <p className="no-results-message">No workshops found for the selected criteria.</p>
                )}
                
                {workshops.length > 0 && (
                    <>
              
           <div className="workshops-grid">
                            {workshops.map(ws => (
                                <WorkshopCard
                           
         key={ws.hashedKhCode}
                                    ws={ws}
                                    isFav={favorites.some(f => f.id === ws.hashedKhCode)}
               
                     onToggleFav={() => toggleFav(ws)}
                                    countryCode={searchParams.country}
                                />
         
                    ))}
                        </div>

                        {searchParams.perPage !== 'All' && (
                            <Pagination
 
                                page={pagination.page}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
     
                             isLoading={isLoading}
                            />
                        )}

                     
   {searchParams.perPage === 'All' && (
                            <div ref={bottomRef} style={{ padding: '20px', textAlign: 'center' }}>
                                {isFetchingMore ?
 (
                                    <Spinner />
                                ) : hasMore ?
 (
                                    <p>Scroll down to load more workshops...</p>
                                ) : (
                         
            <p>You've reached the end of the list!</p>
                                )}
                            </div>
                       
 )}
                    </>
                )}
            </main>
           
            <FavoritesDrawer
                favorites={favorites}
            
     onToggleFav={toggleFav}
            />
        </div>
    );
}