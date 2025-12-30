import { ACTIONS } from "@/constants/ACTIONS.js";
import { navBarOptions } from "@/constants/navBarOptions";

export const initialState = { isMainMenuAvailable: false, navBarOptions };

export const themeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.turnOffMenuState: {
      return { ...state, isMainMenuAvailable: false };
    }
    case ACTIONS.switchMenuState: {
      return { ...state, isMainMenuAvailable: !state.isMainMenuAvailable };
    }
  }
};
