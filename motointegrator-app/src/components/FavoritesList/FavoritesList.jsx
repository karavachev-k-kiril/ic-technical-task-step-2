import React from 'react';
import WorkshopCard from '../WorkshopCard/WorkshopCard';
import FavoritesListItem from '../FavoritesListItem/FavoritesListItem';
import './FavoritesList.css';


const FavoritesList = ({ favorites, onToggleFav, viewMode, isInsideDrawer }) => {

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