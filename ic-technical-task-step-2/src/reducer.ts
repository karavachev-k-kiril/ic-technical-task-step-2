export interface AppState {
  country: string;
  perPage: string;
  availability: string;
  brand: string;
  searchQuery: string;
}

export type Action =
  | { type: 'SET_COUNTRY'; payload: string }
  | { type: 'SET_PER_PAGE'; payload: string }
  | { type: 'SET_AVAILABILITY'; payload: string }
  | { type: 'SET_BRAND'; payload:string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'HANDLE_SEARCH' };

export const initialState: AppState = {
  country: 'PL',
  perPage: '10',
  availability: '-',
  brand: '-',
  searchQuery: '',
};

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_COUNTRY':
      return { ...state, country: action.payload };
    case 'SET_PER_PAGE':
      return { ...state, perPage: action.payload };
    case 'SET_AVAILABILITY':
      return { ...state, availability: action.payload };
    case 'SET_BRAND':
      return { ...state, brand: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'HANDLE_SEARCH':
      return { ...state };
    default:
      throw new Error(`Unknown action type`);
  }
}