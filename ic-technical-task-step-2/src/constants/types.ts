export interface Address {
  locality: string;
  localitySlug: string;
}

export interface Reviews {
  count: number;
  score: number;
}

export interface Workshop {
  hashedKhCode: string;
  name: string;
  slug: string;
  image: string | null;
  address: Address | null;
  phoneNumber: string | null;
  reviews: Reviews | null;
  countryCode?: string; // Optional because it's added on the client-side for favorites
}

export interface Brand {
  id: string;
  name: string;
  count: number;
}

export interface PaginationInfo {
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
}

// This interface represents the full structure of the API response.
export interface APIResponse {
  results: Workshop[];
  filters: {
    brands: Brand[];
  };
  pagination: PaginationInfo;
}