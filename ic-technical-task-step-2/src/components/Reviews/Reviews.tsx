import React from 'react';
import StarIcon from '../UI/Icons/StarIcon';
import { Reviews as ReviewsType } from '../../constants/types';
import './Reviews.css';

interface ReviewsProps {
    reviews: ReviewsType | null;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
    if (!reviews || !reviews.count) {
        return (
            <div className="reviews-container placeholder">
                <span className="no-rating-text">No rating available</span>
            </div>
        );
    }

    const { score, count } = reviews;

    return (
        <div className="reviews-container">
            <StarIcon />
            <span className="reviews-score">{score.toFixed(1)}</span>
            <span className="reviews-count">({count})</span>
        </div>
    );
};

export default Reviews;