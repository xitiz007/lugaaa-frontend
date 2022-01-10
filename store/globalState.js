import { createContext, useReducer, useEffect } from "react";
import reducers from "./reducers";
import { ADD_CART } from "./constants";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    cart: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart.length > 0) {
      dispatch({ type: ADD_CART, payload: cart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
