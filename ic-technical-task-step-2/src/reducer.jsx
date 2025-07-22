export const initialState = {
  country: 'PL',
  perPage: '10',
  availability: '-',
  brand: '-',
  searchQuery: '',
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_COUNTRY':
      return { ...state, country: action.payload, page: 1 };
    case 'SET_PER_PAGE':
      return { ...state, perPage: action.payload, page: 1 };
    case 'SET_AVAILABILITY':
      return { ...state, availability: action.payload, page: 1 };
    case 'SET_BRAND':
      return { ...state, brand: action.payload, page: 1 };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'HANDLE_SEARCH':
      return { ...state, page: 1 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}