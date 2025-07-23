import { State } from './constants/types';

// Define the shape of all possible actions
type Action =
  | { type: 'SET_FILTERS'; payload: Partial<State> }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'HANDLE_SEARCH' };

export const initialState: State = {
  country: 'PL',
  perPage: '10',
  availability: '-',
  brand: '-',
  searchQuery: '',
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, ...action.payload, page: 1 };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'HANDLE_SEARCH':
      return { ...state, page: 1 };
    default:
      throw new Error(`Unknown action type`);
  }
}