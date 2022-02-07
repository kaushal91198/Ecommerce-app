import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_PAYMENT_METHOD,CART_SAVE_SHIPPING_ADDRESS } from "../Constants/cartConstant";

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    // console.log(getState()) //it will state value from store's different reducer see yhis
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    // console.log(getState().cart.cartItems)
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch, getState) => {

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId,
    });
    console.log(getState().cart)
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
  };
};
  export const saveShippingAddress = (data)=>{
    return async (dispatch,getState) =>{
      dispatch({type:CART_SAVE_SHIPPING_ADDRESS,payload:data})
      localStorage.setItem("shippingAddress",JSON.stringify(data))
    }
  }

export const savePaymentMethod = (data)=>{
  return async (dispatch,getState)=>{
  dispatch({type:CART_SAVE_PAYMENT_METHOD,payload:data})
  localStorage.setItem("paymentMethod",JSON.stringify(data))
  }
}