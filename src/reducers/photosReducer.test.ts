import photosReducer from "./photosReducer";
import { photosInitialState } from "./initialState";
import { photosActions } from "../actions/photosActions";

describe("photosReducer tests", () => {
  it("should handle SET_FETCHING_STATUS", () => {
    const expectedState = { ...photosInitialState, isFetching: true};
    const action = photosActions.setFetchingStatus(true);
    const photosState = photosReducer(photosInitialState, action);
    expect(photosState).toEqual(expectedState);
  });
  it("should handle SELECT_USER", () => {
    const expectedState = { ...photosInitialState, selectedUser: 23};
    const action = photosActions.selectUser(23);
    const photosState = photosReducer(photosInitialState, action);
    expect(photosState).toEqual(expectedState);
  });
  it("should handle SET_LIMIT", () => {
    const expectedState = { ...photosInitialState, getPhotosLimit: 99};
    const action = photosActions.setLimit(99);
    const photosState = photosReducer(photosInitialState, action);
    expect(photosState).toEqual(expectedState);
  });
});