import { LOGIN_SUCCESS, GET_DETAILS } from "../actions/types";
import { initialState  } from "../service/store";


export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) { 
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      }; 
      break;  
    case GET_DETAILS:
      return {
        ...state,
        isLoggedIn: true,
        getUser: payload,
      }; 
      break; 
  default:
      return state;
  }
}
