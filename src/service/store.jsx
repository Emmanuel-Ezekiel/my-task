import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers/auth";


 export const initialState = {
  user: null,
  isLoggedIn: false,
  getUser: null,
};

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The action: ", action);
  const returnValue = next(action);
  console.log("The new state: ", store.getState());
  console.groupEnd();
  return returnValue;
};

// const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
