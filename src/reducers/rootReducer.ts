import { combineReducers, Reducer } from "redux";
import photosReducer from "./photosReducer";

const rootReducer: Reducer<State.Root> = combineReducers({
  photos: photosReducer
} as any);

export default rootReducer;
