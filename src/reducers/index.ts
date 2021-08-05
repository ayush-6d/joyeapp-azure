import { combineReducers } from "redux";
import { alertReducer } from "./alertReducer";
import { loadingReducers } from "./loadingReducers";
import { loginReducer } from "./loginReducer";
import { miscellaneousReducer } from "./miscellaneousReducer";

export const rootReducer = combineReducers({
  alert: alertReducer,
  login: loginReducer,
  miscellaneous: miscellaneousReducer,
  loading: loadingReducers,
});
