import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../constants';
import { Workshop, PaginationInfo, Brand, APIResponse } from '../constants/types';

interface SearchParams {
    country: string;
    page: number;
    perPage: string | number;
    availability: string;
    brand: string;
    query: string;
}

interface FetchParams {
    country: string;
    pageToFetch: number;
    perPageToFetch: string | number;
    availability: string;
    brand: string;
    query: string;
}

export const useWorkshops = (initialCountry: string, initialPage: number, initialPerPage: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, perPage: 10, totalPages: 1, total: 0 });
    const [availableFilters, setAvailableFilters] = useState<{ brands: Brand[] }>({ brands: [] });
    const [searchParams, setSearchParams] = useState<SearchParams>({
        country: initialCountry,
        page: initialPage,
        perPage: initialPerPage,
        availability: '-',
        brand: '-',
        query: '',
    });
    const [infiniteScrollPage, setInfiniteScrollPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

    const MAX_API_PER_PAGE = 100;

    const performFetch = useCallback(async (
        params: FetchParams,
        appendResults = false
    ) => {
        setError(null);
        const { country, pageToFetch, perPageToFetch, availability, brand, query } = params;

        try {
            let url = `${API_URL}?locale=en&market=${country}&page=${pageToFetch}&perPage=${perPageToFetch}`;
            if (availability && availability !== '-') {
                 url += `&availability=${availability}`;
            }
            if (brand && brand !== '-') {
                url += `&brands=${brand}`;
            }
            if (query) {
                url += `&query=${encodeURIComponent(query)}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || response.statusText || 'Unknown error';
                throw new Error(`API Error: ${errorMessage} (Status: ${response.status})`);
            }

            const data: APIResponse = await response.json();

            if (appendResults) {
                setWorkshops(prevWorkshops => [...prevWorkshops, ...(data.results || [])]);
            } else {
                setWorkshops(data.results || []);
            }

            if (data.filters) {
                setAvailableFilters({ brands: data.filters.brands || [] });
            }

            setPagination(data.pagination || { page: 1, perPage: 10, totalPages: 1, total: 0 });

            if (searchParams.perPage === 'All') {
                setHasMore(pageToFetch < (data.pagination?.totalPages || 0));
            } else {
                setHasMore(false);
            }

        } catch (err: any) {
            console.error("Fetch Data Error:", err);
            setError(`Failed to fetch workshop data: ${err.message}. The API might be down or has strict limits.`);
            if (!appendResults) {
                setWorkshops([]);
                setPagination({ page: 1, perPage: 10, totalPages: 1, total: 0 });
            }
            setHasMore(false);
        }
    }, [searchParams.perPage]);

    useEffect(() => {
        const { country, page, perPage, availability, brand, query } = searchParams;

        setIsLoading(true);
        setError(null);

        const fetchParams: FetchParams = { country, pageToFetch: page, perPageToFetch: perPage, availability, brand, query };

        if (perPage === 'All') {
            setWorkshops([]);
            setInfiniteScrollPage(1);
            setHasMore(true);
            fetchParams.pageToFetch = 1;
            fetchParams.perPageToFetch = MAX_API_PER_PAGE;

            performFetch(fetchParams, false)
                .finally(() => setIsLoading(false));
        } else {
            setInfiniteScrollPage(1);
            setHasMore(false);
  
            performFetch(fetchParams, false)
                .finally(() => setIsLoading(false));
        }
    }, [searchParams, performFetch]);

    const loadMoreWorkshops = useCallback(async () => {
        if (isFetchingMore || !hasMore || isLoading || searchParams.perPage !== 'All') {
            return;
        }

        setIsFetchingMore(true);
        const nextPage = infiniteScrollPage + 1;
        setInfiniteScrollPage(nextPage);

        try {
            const { country, availability, brand, query } = searchParams;
            const fetchParams: FetchParams = { country, pageToFetch: nextPage, perPageToFetch: MAX_API_PER_PAGE, availability, brand, query };
            await performFetch(fetchParams, true);
        } finally {
            setIsFetchingMore(false);
        }
    }, [isFetchingMore, hasMore, isLoading, infiniteScrollPage, searchParams, performFetch]);

    return {
        isLoading,
        workshops,
        pagination,
        availableFilters,
        searchParams,
        setSearchParams,
        workshopsError: error,
        loadMoreWorkshops,
        isFetchingMore,
        hasMore
    };
};