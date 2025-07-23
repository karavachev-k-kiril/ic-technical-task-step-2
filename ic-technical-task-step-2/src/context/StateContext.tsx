import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { reducer, initialState } from '../reducer';
import { State } from '../constants/types';

interface StateContextType {
  state: State;
  dispatch: React.Dispatch<any>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};