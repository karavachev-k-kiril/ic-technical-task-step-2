import React, { useCallback, useMemo } from 'react';
import type { JSX } from 'react';
import './Pagination.css';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    isLoading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange, isLoading }) => {
    if (totalPages <= 1) return null;

    const handlePageClick = useCallback((newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && !isLoading) {
            onPageChange(newPage);
        }
    }, [totalPages, isLoading, onPageChange]);

    const renderPageNumbers = useMemo(() => {
        const pageNumbers: JSX.Element[] = [];
        const maxButtons = 6;
        let startPage: number, endPage: number;

        if (totalPages <= maxButtons) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxButtons / 2);
            const maxPagesAfterCurrent = Math.ceil(maxButtons / 2) - 1;
            if (page <= maxPagesBeforeCurrent) {
                startPage = 1;
                endPage = maxButtons;
            } else if (page + maxPagesAfterCurrent >= totalPages) {
                startPage = totalPages - maxButtons + 1;
                endPage = totalPages;
            } else {
                startPage = page - maxPagesBeforeCurrent;
                endPage = page + maxPagesAfterCurrent;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`pagination-number ${page === i ? 'active' : ''}`}
                    disabled={isLoading}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    }, [page, totalPages, isLoading, handlePageClick]);

    return (
        <div className="pagination-container">
            <button onClick={() => handlePageClick(page - 1)} disabled={page <= 1 || isLoading} className="pagination-arrow prev">
                &lt;
            </button>
            <div className="pagination-numbers-desktop">
                {renderPageNumbers}
            </div>
            <div className="pagination-numbers-mobile">
                Page {page} of {totalPages}
            </div>
            <button onClick={() => handlePageClick(page + 1)} disabled={page >= totalPages || isLoading} className="pagination-arrow next">
                &gt;
            </button>
        </div>
    );
};

export default React.memo(Pagination);