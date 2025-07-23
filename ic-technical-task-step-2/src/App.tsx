import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import { useWorkshops } from './hooks/useWorkshops';
import { useFavorites } from './hooks/useFavorites';
import { useStateContext } from './context/StateContext';

import Filters from './components/Filters/Filters';
import WorkshopCard from './components/WorkshopCard/WorkshopCard';
import Pagination from './components/Pagination/Pagination';
import CarFinderIcon from './components/UI/Icons/CarFinderIcon';
import FavoritesDrawer from './components/FavoritesDrawer/FavoritesDrawer';
import Spinner from './components/UI/Spinner/Spinner';
import MessageDialog from './components/UI/MessageDialog/MessageDialog';

import './App.css';

const MemoizedWorkshopCard = React.memo(WorkshopCard);

const App: React.FC = () => {
    const { state, dispatch } = useStateContext();
    const { country, perPage } = state;
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
    } = useWorkshops(country, 1, perPage);
    const { favorites, toggleFav, favoritesError, setFavoritesError } = useFavorites(userId, searchParams.country);

    const [errorMessage, setErrorMessage] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const isLoading = isAuthLoading || isWorkshopsLoading;

    useEffect(() => {
        const error = authError || workshopsError || favoritesError;
        if (error) {
            setErrorMessage(error);
            if (favoritesError) setFavoritesError(null);
        }
    }, [authError, workshopsError, favoritesError, setFavoritesError]);

    useEffect(() => {
        if (searchParams.perPage !== 'All' || !bottomRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isFetchingMore && !isWorkshopsLoading) {
                    loadMoreWorkshops();
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.1 }
        );

        const currentRef = bottomRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [bottomRef, searchParams.perPage, hasMore, isFetchingMore, isWorkshopsLoading, loadMoreWorkshops]);

    const handleSearch = useCallback(() => {
        dispatch({ type: 'HANDLE_SEARCH' });
        setSearchParams({ ...state, page: 1, query: state.searchQuery });
    }, [state, dispatch, setSearchParams]);

    const handlePageChange = useCallback((newPage: number) => {
        setSearchParams(prev => ({ ...prev, page: newPage }));
    }, [setSearchParams]);

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
                    brandOptions={availableFilters.brands}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />

                {isWorkshopsLoading && searchParams.perPage !== 'All' && <Spinner />}

                {!isWorkshopsLoading && workshops.length === 0 && !workshopsError && (
                    <p className="no-results-message">No workshops found for the selected criteria.</p>
                )}
                
                {workshops.length > 0 && (
                    <>
                        <div className="workshops-grid">
                            {workshops.map(ws => (
                                <MemoizedWorkshopCard
                                    key={ws.hashedKhCode}
                                    ws={ws}
                                    isFav={favorites.some(f => f.hashedKhCode === ws.hashedKhCode)}
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
                                {isFetchingMore ? (
                                    <Spinner />
                                ) : hasMore ? (
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

export default App;