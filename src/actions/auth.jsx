import {
  LOGIN_SUCCESS,
  GET_DETAILS
} from "./types";


export const loginUser = (authUser) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: authUser,
  });
};

export const UserInfo = (authUser) => (dispatch) => {
  dispatch({
    type: GET_DETAILS,
    payload: authUser,
  });
};