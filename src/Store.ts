import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export type RootStore = ReturnType<typeof RootReducer>;

export default store;