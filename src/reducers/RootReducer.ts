import { combineReducers } from "redux";
import apiReducer from "./FetchApiReducer/apiReducer";

const RootReducer = combineReducers({
   cats:apiReducer
});
export default RootReducer;
