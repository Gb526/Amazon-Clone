import React, {createContext, useReducer} from "react";

export const DataContext = createContext();

function DataProvider({ children, reducer, initialState }) {
  return (
    <div>
      <DataContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </DataContext.Provider>
    </div>
  );
}

export default DataProvider;
