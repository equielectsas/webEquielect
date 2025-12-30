"use client";

import React, { useReducer, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const initialState = {
  startDate: "",
  endDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_DATES":
      return { ...state, ...action.payload };
    case "RESET_DATES":
      return initialState;
    default:
      return state;
  }
};

const DateFilter = ({ onFilter }) => {
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? usePathname() : null;
  const searchParams = typeof window !== "undefined" ? useSearchParams() : null;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!searchParams) return;

    const startDateFromURL = searchParams.get("createdAt[gte]");
    const endDateFromURL = searchParams.get("createdAt[lte]");

    if (startDateFromURL && endDateFromURL) {
      dispatch({
        type: "SET_DATES",
        payload: {
          startDate: startDateFromURL,
          endDate: endDateFromURL,
        },
      });
    }
  }, [searchParams]);

  const handleFilter = () => {
    if (!pathname) return;

    const queryParams = new URLSearchParams();
    queryParams.set("createdAt[gte]", state.startDate);
    queryParams.set("createdAt[lte]", state.endDate);

    if (pathname.includes("cotizaciones")) {
      router.push(`/cotizaciones?${queryParams.toString()}`);
    } else if (pathname.includes("mensajes")) {
      router.push(`/mensajes?${queryParams.toString()}`);
    }

    if (onFilter) {
      onFilter(state.startDate, state.endDate);
    }
  };

  return (
    <div className="mb-6 flex gap-4 items-center">
      <label className="flex flex-col">
        Fecha inicio:
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={state.startDate}
          onChange={(e) =>
            dispatch({ type: "SET_START_DATE", payload: e.target.value })
          }
        />
      </label>
      <label className="flex flex-col">
        Fecha fin:
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={state.endDate}
          onChange={(e) =>
            dispatch({ type: "SET_END_DATE", payload: e.target.value })
          }
        />
      </label>
      <button
        onClick={handleFilter}
        disabled={!state.startDate || !state.endDate}
        className={`px-3 py-2 mt-6 ${
          state.startDate && state.endDate
            ? "bg-yellow-600 text-white hover:bg-yellow-800"
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
      >
        Filtrar
      </button>
    </div>
  );
};

export default DateFilter;
