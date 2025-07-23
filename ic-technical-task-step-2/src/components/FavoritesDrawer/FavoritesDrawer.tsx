import React, { useState, useEffect, MouseEvent } from 'react';
import FavoritesList from '../FavoritesList/FavoritesList';
import CloseIcon from '../UI/Icons/CloseIcon';
import ChevronDownIcon from '../UI/Icons/ChevronDownIcon';
import GridIcon from '../UI/Icons/GridIcon';
import ListIcon from '../UI/Icons/ListIcon';
import { Workshop } from '../../constants/types';
import './FavoritesDrawer.css';

interface FavoritesDrawerProps {
    favorites: Workshop[];
    onToggleFav: (ws: Workshop) => void;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ favorites, onToggleFav }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

    const toggleDrawer = () => {
        if (!favorites.length && !isOpen) {
            return;
        }
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        if (!favorites.length && isOpen) {
            setIsOpen(false);
        }
    }, [favorites.length, isOpen]);

    const handleViewModeChange = (e: MouseEvent<HTMLButtonElement>, mode: 'cards' | 'list') => {
        e.stopPropagation();
        setViewMode(mode);
    };

    return (
        <div className={`favorites-drawer ${isOpen ? 'open' : 'closed'} ${!favorites.length ? 'empty' : ''}`}>
            <div className="drawer-header" onClick={toggleDrawer}>
                <h3 className="drawer-title">
                    Your Favorites ({favorites.length})
                </h3>
                <div className="drawer-controls">
                    {isOpen && favorites.length > 0 && (
                        <>
                            <button
                                className={`view-mode-button ${viewMode === 'cards' ? 'active' : ''}`}
                                onClick={(e) => handleViewModeChange(e, 'cards')}
                                title="Card View"
                            >
                                <GridIcon />
                            </button>
                            <button
                                className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={(e) => handleViewModeChange(e, 'list')}
                                title="List View"
                            >
                                <ListIcon />
                            </button>
                        </>
                    )}
                    <button className="drawer-toggle-button" title={isOpen ? "Hide Favorites" : "Show Favorites"}>
                         {isOpen ? <CloseIcon /> : (favorites.length > 0 && <ChevronDownIcon />)}
                    </button>
                </div>
            </div>

            {isOpen && (
                 <div className="drawer-content">
                    {favorites.length > 0 ? (
                        <FavoritesList
                            favorites={favorites}
                            onToggleFav={onToggleFav}
                            viewMode={viewMode}
                            isInsideDrawer={true}
                        />
                    ) : (
                        <div className="no-favorites-container-drawer">
                            <h2 className="no-favorites-title-drawer">No Favorites Yet</h2>
                            <p className="no-favorites-text-drawer">Click the heart icon on any workshop to save it here.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FavoritesDrawer;