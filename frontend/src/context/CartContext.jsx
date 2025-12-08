// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [], // { id, name, price, qty, image }
};

// helper for localStorage
const storageKey = "mini_ecom_cart_v1";
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : initialState;
  } catch {
    return initialState;
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD_ITEM": {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
          ),
        };
      }
      return { ...state, items: [...state.items, item] };
    }
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // init
  useEffect(() => {
    const saved = loadFromStorage();
    dispatch({ type: "INIT", payload: saved });
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {}
  }, [state]);

  const addItem = (item) =>
    dispatch({ type: "ADD_ITEM", payload: item });

  const updateQty = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });

  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const itemsCount = state.items.reduce((s, it) => s + it.qty, 0);
  const itemsTotal = state.items.reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <CartContext.Provider
      value={{ cart: state, addItem, updateQty, removeItem, clearCart, itemsCount, itemsTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);