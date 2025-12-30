import { ACTIONS } from "@/constants/ACTIONS.js";

export const initialState = {
  cotizacionProducts: [],
  isCotizacionAvailable: false,
};

export const cotizacionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.turnOffCotizacionState: {
      return { ...state, isCotizacionAvailable: false };
    }

    case ACTIONS.switchCotizacionState: {
      return { ...state, isCotizacionAvailable: !state.isCotizacionAvailable };
    }

    case ACTIONS.addProductToCotizacion: {
      const productToAdd = action.payload;

      const arrayOfProducts = [...state.cotizacionProducts];

      const productAlreadyExists = arrayOfProducts.find(
        (product) => product._id === productToAdd._id
      );

      if (productAlreadyExists) {
        productAlreadyExists.quantity = productToAdd.quantity;
        return { ...state, cotizacionProducts: arrayOfProducts };
      }

      arrayOfProducts.push(productToAdd);

      return { ...state, cotizacionProducts: arrayOfProducts };
    }

    case ACTIONS.removeProductFromCotizacion: {
      const productToRemove = action.payload._id;

      const newArrayOfProducts = state.cotizacionProducts.filter((product) => {
        return product._id !== productToRemove;
      });

      return { ...state, cotizacionProducts: newArrayOfProducts };
    }

    case ACTIONS.removeAllProductsFromCotizacion: {
      return { ...state, cotizacionProducts: [] };
    }

    case ACTIONS.increaseProductQuantityByOne: {
      const productToModify = action.payload;

      const arrayOfProducts = [...state.cotizacionProducts];

      const productAlreadyExists = arrayOfProducts.find(
        (product) => product._id === productToModify._id
      );

      if (!productAlreadyExists) {
        return;
      }

      productAlreadyExists.quantity += 1;
      return { ...state, cotizacionProducts: arrayOfProducts };
    }

    case ACTIONS.decreaseProductQuantityByOne: {
      const productToModify = action.payload;

      const arrayOfProducts = [...state.cotizacionProducts];

      const productAlreadyExists = arrayOfProducts.find(
        (product) => product._id === productToModify._id
      );

      if (!productAlreadyExists) {
        return;
      }

      if (productAlreadyExists.quantity === 1) {
        const filteredArrayOfProducts = arrayOfProducts.filter(
          (product) => product._id !== productToModify._id
        );

        return {
          ...state,
          cotizacionProducts: filteredArrayOfProducts,
        };
      }

      productAlreadyExists.quantity -= 1;
      return { ...state, cotizacionProducts: arrayOfProducts };
    }

    default:
      return state;
  }
};
