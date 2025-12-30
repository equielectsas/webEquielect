import { ACTIONS } from "@/constants/ACTIONS.js";

const productFilters = { marca: [], color: [] };

export const initialState = { areFiltersAvailable: false, productFilters };

export const productReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.turnOffFiltersState: {
      return { ...state, areFiltersAvailable: false };
    }

    case ACTIONS.switchFiltersState: {
      return { ...state, areFiltersAvailable: !state.areFiltersAvailable };
    }

    case ACTIONS.addFilter: {
      const [newFilterKey, newFilterValue] = action.payload;
      const newProductFilters = { ...state.productFilters };

      const valueAlreadyExists =
        newProductFilters[newFilterKey].includes(newFilterValue);

      !valueAlreadyExists ||
        newProductFilters[newFilterKey].push(newFilterValue);

      return { ...state, productFilters: newProductFilters };
    }

    case ACTIONS.removeFilter: {
      const [newFilterKey, newFilterValue] = action.payload;

      const newProductFilters = state.productFilters[newFilterKey].filter(
        (filter) => {
          return filter !== newFilterValue;
        }
      );

      return { ...state, productFilters: newProductFilters };
    }
  }
};
