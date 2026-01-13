"use client";
import React, { createContext, useContext, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);

function toNumber(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const p = action.payload; // {id, name/title, price, image, brand}
      const qtyToAdd = Math.max(1, toNumber(action.qty ?? 1));

      const existing = state.items.find((it) => it.id === p.id);
      let items;

      if (existing) {
        items = state.items.map((it) =>
          it.id === p.id ? { ...it, qty: it.qty + qtyToAdd } : it
        );
      } else {
        items = [...state.items, { ...p, qty: qtyToAdd }];
      }

      return { ...state, items };
    }

    case "INC_QTY":
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, qty: it.qty + 1 } : it
        ),
      };

    case "DEC_QTY":
      return {
        ...state,
        items: state.items
          .map((it) => (it.id === action.id ? { ...it, qty: it.qty - 1 } : it))
          .filter((it) => it.qty > 0),
      };

    case "SET_QTY": {
      const { id, qty } = action;
      const q = Math.max(0, toNumber(qty));
      return {
        ...state,
        items:
          q === 0
            ? state.items.filter((it) => it.id !== id)
            : state.items.map((it) => (it.id === id ? { ...it, qty: q } : it)),
      };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((it) => it.id !== action.id) };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // ✅ Estado global del drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useMemo(
    () => state.items.reduce((acc, it) => acc + it.qty, 0),
    [state.items]
  );

  const total = useMemo(
    () => state.items.reduce((acc, it) => acc + it.qty * toNumber(it.price), 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      cartCount,
      total,

      // acciones carrito
      addItem: (product, qty = 1) =>
        dispatch({ type: "ADD_ITEM", payload: product, qty }),
      incQty: (id) => dispatch({ type: "INC_QTY", id }),
      decQty: (id) => dispatch({ type: "DEC_QTY", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
      clear: () => dispatch({ type: "CLEAR" }),

      // ✅ acciones drawer
      isCartOpen,
      openCartDrawer: () => setIsCartOpen(true),
      closeCartDrawer: () => setIsCartOpen(false),
      toggleCartDrawer: () => setIsCartOpen((v) => !v),
    }),
    [state.items, cartCount, total, isCartOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart() debe usarse dentro de <CartProvider />");
  return ctx;
}
