import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIlS,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIlS
} from "../Constants/productConstant";
import axios from "axios";


//all product actionCreator
export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCTS_LIST_REQUEST,
      });
      const res = await axios.get("http://localhost:5000/api/products");
      const products = res.data;
      dispatch({
        type: PRODUCTS_LIST_SUCCESS,
        payload: products,
      });
    } catch (error) {
      dispatch({
        type: PRODUCTS_LIST_FAIlS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

//single product actionCreator
export const detailProducts = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCTS_DETAILS_REQUEST,
      });
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      const products = res.data;
      dispatch({
        type: PRODUCTS_DETAILS_SUCCESS,
        payload: products,
      });
    } catch (error) {
      dispatch({
        type: PRODUCTS_DETAILS_FAIlS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};