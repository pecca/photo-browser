import { put, call, select } from "redux-saga/effects";
import { photosActions } from "../actions/photosActions";
import { getPhotos, getAlbums, getUsers } from "../utils/JSONPlaceholderApi";
import { getAlbumIdsByUser, userNotSelected, albumNotSelected } from "../utils/photosUtils";
import { photosSelectors } from "../utils/selectors";

/** Fetch all users */
export function * fetchUsersSaga(action: ReturnType<typeof photosActions.fetchUsers>) {
  yield put(photosActions.setFetchingStatus(true));
  const users: Api.User[] = yield call(getUsers);
  yield put(photosActions.setUsers(users));
  yield put(photosActions.setFetchingStatus(false));
}

/** Fetch all albums */
export function * fetchAlbumsSaga(action: ReturnType<typeof photosActions.fetchAlbums>) {
  yield put(photosActions.setFetchingStatus(true));
  const albums: Api.Album[] = yield call(getAlbums);
  yield put(photosActions.setAlbums(albums));
  yield put(photosActions.setFetchingStatus(false));
}

/** Fetch photos based on user's selection */
export function * fetchPhotosSaga(action: ReturnType<typeof photosActions.fetchPhotos>) {
  const photosState = yield select(photosSelectors.photos);
  const {albums, selectedUser, selectedAlbum, getPhotosPage, getPhotosLimit} = photosState;
  let selectionParameter = "";

  // select albums to fetch
  let albumIds: number[] = [];
  if (selectedUser !== userNotSelected) {
    if (selectedAlbum !== albumNotSelected) {
      albumIds = [selectedAlbum];
    } else {
      // select all albums by user
      albumIds = getAlbumIdsByUser(selectedUser, albums);
    }
  } else if (selectedAlbum !== albumNotSelected) {
    albumIds = [selectedAlbum];
  }

  // create photo selection parameters
  albumIds.forEach(albumId => {
    (selectionParameter === "") ? selectionParameter = "?" : selectionParameter += "&";
    selectionParameter += `albumId=${albumId}`
  });

  // add page and limit parameters
  (selectionParameter === "") ? selectionParameter = "?" : selectionParameter += "&";
  selectionParameter += `_page=${getPhotosPage}&_limit=${getPhotosLimit}`

  yield put(photosActions.setFetchingStatus(true));
  const photos: Api.Photo[] = yield call(getPhotos, selectionParameter);
  yield put(photosActions.setCount(photos.length));
  yield put(photosActions.setPhotos(photos));
  yield put(photosActions.setFetchingStatus(false));
}

/** Fetch signle photo */
export function * fetchPhotoSaga(action: ReturnType<typeof photosActions.fetchPhoto>) {
  const photoId = action.payload;
  const selectionParameter = `?id=${photoId}`
  const photos: Api.Photo[] = yield call(getPhotos, selectionParameter);
  if (photos.length > 0) {
    yield put(photosActions.setShowingPhoto(photos[0]));
  }
}
