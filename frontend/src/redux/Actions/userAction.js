import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIlS,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIlS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIlS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIlS,
  USER_PROFILE_RESET,
} from "../Constants/userConstant";
import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../Constants/orderConstant";

export const userLogin = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );
      const userData = res.data;

      if (userData.message) {
        // console.log("condition working")
        throw new Error(userData.message);
      }
      if (!userData.message) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: userData,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify(getState().userLogin.userInfo)
        );
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIlS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      // console.log(getState().userLogin)
    }
  };
};

export const userLogout = () => {
  return async (dispatch, getState) => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_PROFILE_RESET });
  };
};
export const userSignup = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_SIGNUP_REQUEST,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        { name, email, password },
        config
      );
      const userData = res.data;

      if (userData.message) {
        // console.log("condition working")
        throw new Error(userData.message);
      }
      if (!userData.message) {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: userData,
        });
        dispatch({
          type: "remove",
        });
      }
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIlS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const userProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PROFILE_REQUEST,
      });
      const token = getState().userLogin.userInfo.token;
      // console.log(token)
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `http://localhost:5000/api/users/profile`,
        config
      );
      const userData = res.data;

      if (userData.message) {
        // console.log("condition working")
        throw new Error(userData.message);
      }
      if (!userData.message) {
        dispatch({
          type: USER_PROFILE_SUCCESS,
          payload: userData,
        });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: userData,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify(getState().userLogin.userInfo)
        );
      }
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIlS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const userUpdateProfile = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });
      const token = getState().userLogin.userInfo.token;
      // console.log(token)
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `http://localhost:5000/api/users/profile`,
        { name, email, password },
        config
      );
      const userData = res.data;

      if (userData.message) {
        // console.log("condition working")
        throw new Error(userData.message);
      }
      if (!userData.message) {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: userData,
        });
        // dispatch({
        //   type: USER_LOGIN_SUCCESS,
        //   payload: userData,
        // });
        localStorage.setItem(
          "userInfo",
          JSON.stringify(getState().userLogin.userInfo)
        );
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIlS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
