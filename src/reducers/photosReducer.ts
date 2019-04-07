import { PhotosActions, PhotosActionsEnum } from "../actions/photosActions";
import { photosInitialState } from "./initialState";

const photosReducer = (state: State.Photos = photosInitialState, action: PhotosActions): State.Photos => {
  switch (action.type) {
    case PhotosActionsEnum.SET_FETCHING_STATUS:
      const status = action.payload;
      return {...state, isFetching: status};
    case PhotosActionsEnum.SET_USERS:
      const users = action.payload;
      return {...state, users};
    case PhotosActionsEnum.SET_ALBUMS:
      const albums = action.payload;
      return {...state, albums};
    case PhotosActionsEnum.SET_PHOTOS:
      const photos = action.payload;
      return {...state, photos};
    case PhotosActionsEnum.SELECT_USER:
      const userId = action.payload;
      return {...state, selectedUser: userId};
    case PhotosActionsEnum.SELECT_ALBUM:
      const albumId = action.payload;
      return {...state, selectedAlbum: albumId};
    case PhotosActionsEnum.SET_PAGE:
      const page = action.payload;
      return {...state, getPhotosPage: page};
    case PhotosActionsEnum.SET_LIMIT:
      const limit = action.payload;
      return {...state, getPhotosLimit: limit};
    case PhotosActionsEnum.SET_COUNT:
      const count = action.payload;
      return {...state, getPhotosCount: count};
    case PhotosActionsEnum.SET_SHOWING_PHOTO:
      const photo = action.payload;
      return {...state, showingPhoto: photo};
    default:
      return state;
  }
};

export default photosReducer;
