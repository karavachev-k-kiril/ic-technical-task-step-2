import React from 'react';
import HeartIcon from '../UI/Icons/HeartIcon';
import PhoneIcon from '../UI/Icons/PhoneIcon';
import './FavoritesListItem.css';

const FavoritesListItem = ({ ws, onToggleFav, countryCode }) => {
    const linkUrl = `https://motointegrator.com/${countryCode.toLowerCase()}/en/carworkshop/${ws.address?.localitySlug}/${ws.hashedKhCode}-${ws.slug}`;

    return (
        <div className="favorite-list-item">
            <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`View details for ${ws.name}`}
                className="list-item-link"
            >
                <div className="list-item-content">
                    <span className="list-item-name">{ws.name}</span>
                    {ws.address?.locality && (
                        <><br/><span className="list-item-location">{ws.address.locality}</span></>
                    )}
                </div>
            </a>

            <div className="list-item-actions">
                {ws.phoneNumber && (
                    <a href={`tel:${ws.phoneNumber}`} className="list-item-action-phone" title={`Call ${ws.name}`}>
                        <PhoneIcon />
                    </a>
                )}

                <button onClick={onToggleFav} title="Toggle Favorite" className="favorite-list-toggle-button">
                    <HeartIcon isFav={true} />
                </button>
            </div>
        </div>
    );
};

export default FavoritesListItem;