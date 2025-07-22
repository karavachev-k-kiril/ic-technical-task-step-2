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
  countryCode?: string; 
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

export interface APIResponse {
  results: Workshop[];
  filters: {
    brands: Brand[];
  };
  pagination: PaginationInfo;
}