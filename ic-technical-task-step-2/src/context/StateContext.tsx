import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { reducer, initialState, AppState, Action } from '../reducer';

interface StateContextProps {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};