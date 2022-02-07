import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/cartReducer";
import {
  productListReducer,
  productDetailsReducer,
} from "./Reducers/productReducer";
import {
  userLoginReducer,
  userSignupReducer,
  userProfileReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer
} from "./Reducers/orderReducer";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const cartItmesFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")?JSON.parse(localStorage.getItem("paymentMethod")):{}

const initialState = {
  cart: {
    cartItems: cartItmesFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod :paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderListMy: orderListMyReducer,
});
const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
