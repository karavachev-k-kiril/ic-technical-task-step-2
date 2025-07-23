import React, { useCallback } from 'react';
import HeartIcon from '../UI/Icons/HeartIcon';
import PhoneIcon from '../UI/Icons/PhoneIcon';
import Reviews from '../Reviews/Reviews';
import './WorkshopCard.css';
import { Workshop } from '../../constants/types';

// Define the interface for the component's props for strict type-checking
interface WorkshopCardProps {
    ws: Workshop;
    isFav: boolean;
    onToggleFav: (ws: Workshop) => void;
    countryCode: string;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ ws, isFav, onToggleFav, countryCode }) => {
    const linkUrl = `https://motointegrator.com/${countryCode.toLowerCase()}/en/carworkshop/${ws.address?.localitySlug}/${ws.hashedKhCode}-${ws.slug}`;
    
    // Type the event parameter for the image error handler
    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found`;
    }, []);

    return (
        <div className="card">
            {ws.image ? (
                <img
                    src={ws.image}
                    alt={ws.name}
                    className="card-image"
                    onError={handleImageError}
                />
            ) : (
                <div className="card-image-placeholder">
                    <span className="placeholder-text">No image available</span>
                </div>
            )}

            <div className="card-content">
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View details for ${ws.name}`}
                    className="card-title"
                >
                    {ws.name} <br/> <span className='workshop-city-name'>{ws.address?.locality}</span>
                </a>

                <div className="card-footer">
                    <div className="card-action-item">
                        {ws.phoneNumber ? (
                            <a href={`tel:${ws.phoneNumber}`} className="icon-button" title={`Call ${ws.name}`}>
                                <PhoneIcon />
                            </a>
                        ) : (
                            <div className="icon-placeholder"></div>
                        )}
                    </div>

                    <div className="card-action-item-center">
                        <Reviews reviews={ws.reviews} />
                    </div>

                    <div className="card-action-item">
                        <button onClick={() => onToggleFav(ws)} title="Toggle Favorite" className="icon-button">
                            <HeartIcon isFav={isFav} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(WorkshopCard);