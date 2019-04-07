import {
  fetchUsersSaga,
  fetchPhotosSaga
} from "./photosSagas";
import { put, select, call } from "redux-saga/effects";
import { photosInitialState } from "../reducers/initialState";
import { photosSelectors } from "../utils/selectors";
import { photosActions } from "../actions/photosActions";
import { getPhotos, getUsers } from "../utils/JSONPlaceholderApi";
import { user, photo } from "../containers/MainView/MainView.test";

describe("photosSagas tests", () => {
  it("should fetch users", () => {
    const action = photosActions.fetchUsers();
    const saga = fetchUsersSaga(action);
    expect(saga.next().value).toEqual(put(photosActions.setFetchingStatus(true)));
    expect(saga.next().value).toEqual(call(getUsers));
    expect(saga.next([user]).value).toEqual(put(photosActions.setUsers([user])));
    expect(saga.next().value).toEqual(put(photosActions.setFetchingStatus(false)));
    expect(saga.next().done).toBe(true);
  });
  it("should fetch ptotos", () => {
    const action = photosActions.fetchPhotos();
    const saga = fetchPhotosSaga(action);
    expect(saga.next().value).toEqual(select(photosSelectors.photos));
    const photosState: State.Photos = {
      ...photosInitialState,
      selectedAlbum: 2,
      getPhotosPage: 3,
      getPhotosLimit: 4,
    };
    expect(saga.next(photosState).value).toEqual(put(photosActions.setFetchingStatus(true)));
    expect(saga.next().value).toEqual(call(getPhotos, "?albumId=2&_page=3&_limit=4"));
    const photos = [photo, photo, photo];
    expect(saga.next(photos).value).toEqual(put(photosActions.setCount(photos.length)));
    expect(saga.next().value).toEqual(put(photosActions.setPhotos(photos)));
    expect(saga.next().value).toEqual(put(photosActions.setFetchingStatus(false)));
    expect(saga.next().done).toBe(true);
  });
})