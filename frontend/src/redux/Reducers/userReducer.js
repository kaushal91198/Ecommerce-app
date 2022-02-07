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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIlS:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        userInfo: null,
      };

    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        loading: true,
      };

    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_SIGNUP_FAIlS:
      return {
        loading: false,
        error: action.payload,
      };
    case "remove":
      return {};

    default:
      return state;
  }
};

export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_PROFILE_FAIlS:
      return {
        loading: false,
        error: action.payload,
      };
      case USER_PROFILE_RESET:
        return { user: {} };
    default:
      return state;
  }
};


export const userUpdateProfileReducer = (state =  {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success:true,
        userInfo: action.payload,
      };
    case USER_UPDATE_FAIlS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};