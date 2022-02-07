import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIlS,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIlS
} from "../Constants/productConstant";

//all product reducer
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCTS_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCTS_LIST_FAIlS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


//single product reducer
export const productDetailsReducer = (state = { products: {reviews:[]} }, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCTS_DETAILS_FAIlS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};