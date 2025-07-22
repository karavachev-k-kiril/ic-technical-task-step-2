import React from 'react';
import { COUNTRIES, OPEN_HOURS_OPTIONS } from '../../constants';
import FilterIcon from '../UI/Icons/FilterIcon';
import './Filters.css';
import { useStateContext } from '../../context/StateContext';

const Filters = ({ brandOptions = [], onSearch, isLoading }) => {
  const { state, dispatch } = useStateContext();
  const { country, perPage, availability, brand, searchQuery } = state;

  return (
    <div className="filters-container">
      <div className="filters-grid">
        <div className="filter-item">
          <label htmlFor="searchQuery" className="filter-label">
            Keyword
          </label>
          <input
            type="text"
            id="searchQuery"
            name="searchQuery"
            value={searchQuery}
            onChange={(e) =>
              dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
            }
            className="filter-select"
            placeholder="e.g., Warsaw, BMW"
          />
        </div>
        <div className="filter-item">
          <label htmlFor="perPage" className="filter-label">
            Results per page
          </label>
          <select
            id="perPage"
            name="perPage"
            value={perPage}
            onChange={(e) =>
              dispatch({ type: 'SET_PER_PAGE', payload: e.target.value })
            }
            className="filter-select"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="80">80</option>
            <option value="100">100</option>
            <option value="All">All</option>
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="country" className="filter-label">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={(e) =>
              dispatch({ type: 'SET_COUNTRY', payload: e.target.value })
            }
            className="filter-select"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="availability" className="filter-label">
            Open hours
          </label>
          <select
            id="availability"
            name="availability"
            value={availability}
            onChange={(e) =>
              dispatch({ type: 'SET_AVAILABILITY', payload: e.target.value })
            }
            className="filter-select"
          >
            {OPEN_HOURS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="brand" className="filter-label">
            Car brand
          </label>
          <select
            id="brand"
            name="brand"
            value={brand}
            onChange={(e) =>
              dispatch({ type: 'SET_BRAND', payload: e.target.value })
            }
            className="filter-select"
            disabled={brandOptions.length === 0}
          >
            <option value="-">Any</option>
            {brandOptions.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.count})
              </option>
            ))}
          </select>
        </div>
        <div className="filter-button-container">
          <button
            onClick={onSearch}
            disabled={isLoading}
            className="search-button"
          >
            <FilterIcon />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Filters);
