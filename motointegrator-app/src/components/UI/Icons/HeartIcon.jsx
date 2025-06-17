import React from 'react';

const HeartIcon = ({ isFav, ...props }) => {
    const styles = {
        height: '1.5rem',
        width: '1.5rem',
        transition: 'color 0.2s',
        color: isFav ? '#fd9f48' /* text-red-500 */ : '#a0aec0' /* text-gray-400 */
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFav ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles}
            {...props}
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    );
};

export default HeartIcon;