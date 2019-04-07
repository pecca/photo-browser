import { all, takeEvery } from "redux-saga/effects";

import { PhotosActionsEnum } from "actions/photosActions";
import {
  fetchUsersSaga,
  fetchAlbumsSaga,
  fetchPhotosSaga,
  fetchPhotoSaga,
} from "./photosSagas";

export default function * rootSaga() {
  yield all([
    takeEvery(PhotosActionsEnum.FETCH_USERS, fetchUsersSaga),
    takeEvery(PhotosActionsEnum.FETCH_ALBUMS, fetchAlbumsSaga),
    takeEvery(PhotosActionsEnum.FETCH_PHOTOS, fetchPhotosSaga),
    takeEvery(PhotosActionsEnum.FETCH_PHOTO, fetchPhotoSaga)
  ]);
}
