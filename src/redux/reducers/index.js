import { combineReducers } from "redux";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  allproducts: productReducer,
});

export default rootReducer;
