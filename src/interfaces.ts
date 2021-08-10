import * as Immutable from "immutable";
import { BaseModel } from "./Models/BaseModel";
import { IAsyncState } from "./components/Async";

export interface IState {
  models: Immutable.Map<string, BaseModel<{}>>;
  loading: Immutable.Map<string, IAsyncState>;
  alert: Immutable.Map<string, {}>;
}

export interface ISelectOptions {
  value: string;
  label: string;
}
