import React from 'react';
import WorkshopCard from '../WorkshopCard/WorkshopCard';
import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';
import { Workshop } from '../../constants/types';
import './FavoritesList.css';

interface FavoritesListProps {
    favorites: Workshop[];
    onToggleFav: (ws: Workshop) => void;
    viewMode: 'cards' | 'list';
    isInsideDrawer: boolean;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onToggleFav, viewMode, isInsideDrawer }) => {
    return (
        <div className="favorites-list-container">
            {viewMode === 'cards' ? (
                <div className={`favorites-grid ${isInsideDrawer ? 'favorites-grid-in-drawer' : ''}`}>
                    {favorites.map(ws => (
                        <WorkshopCard
                            key={ws.hashedKhCode}
                            ws={ws}
                            isFav={true}
                            onToggleFav={() => onToggleFav(ws)}
                            countryCode={ws.countryCode || 'pl'}
                        />
                    ))}
                </div>
            ) : (
                <div className="favorites-plain-list">
                    {favorites.map(ws => (
                        <FavoritesListItem
                            key={ws.hashedKhCode}
                            ws={ws}
                            onToggleFav={() => onToggleFav(ws)}
                            countryCode={ws.countryCode || 'pl'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesList;