import { createAction, ActionsUnion } from "../utils/utils";

// ACTIONS TYPES
export enum PhotosActionsEnum {
  FETCH_USERS = "Fetch users (saga)",
  FETCH_ALBUMS = "Fetch albums (saga)",
  FETCH_PHOTOS = "Fetch photos (saga)",
  FETCH_PHOTO = "Fetch photo (saga)",

  SET_FETCHING_STATUS = "Set fetching status",
  SELECT_USER = "Select user",
  SELECT_ALBUM = "Select album",

  SET_USERS = "Set users",
  SET_ALBUMS = "Set albums",
  SET_PHOTOS = "Set photos",
  SET_PAGE = "Set page",
  SET_LIMIT = "Set Limit",
  SET_COUNT = "Set count",

  SELECT_NEXT = "Select next results",
  SELECT_PREVIOUS = "Select previous results",
  SET_SHOWING_PHOTO = "Set showing photo"
}

// ACTION CREATORS
export const photosActions = {
  fetchUsers: () => createAction(PhotosActionsEnum.FETCH_USERS),
  fetchAlbums: () => createAction(PhotosActionsEnum.FETCH_ALBUMS),
  fetchPhotos: () => createAction(PhotosActionsEnum.FETCH_PHOTOS),
  fetchPhoto: (photoId: number) => createAction(PhotosActionsEnum.FETCH_PHOTO, photoId),

  setFetchingStatus: (status: boolean) => createAction(PhotosActionsEnum.SET_FETCHING_STATUS, status),
  setUsers: (users: Api.User[]) => createAction(PhotosActionsEnum.SET_USERS, users),
  setAlbums: (albums: Api.Album[]) => createAction(PhotosActionsEnum.SET_ALBUMS, albums),
  setPhotos: (photos: Api.Photo[]) => createAction(PhotosActionsEnum.SET_PHOTOS, photos),
  selectUser: (userId: number) => createAction(PhotosActionsEnum.SELECT_USER, userId),
  selectAlbum: (albumId: number) => createAction(PhotosActionsEnum.SELECT_ALBUM, albumId),
  selectNext: () => createAction(PhotosActionsEnum.SELECT_NEXT),
  selectPrevious: () => createAction(PhotosActionsEnum.SELECT_PREVIOUS),
  setPage: (page: number) => createAction(PhotosActionsEnum.SET_PAGE, page),
  setLimit: (limit: number) => createAction(PhotosActionsEnum.SET_LIMIT, limit),
  setCount: (count: number) => createAction(PhotosActionsEnum.SET_COUNT, count),
  setShowingPhoto: (photo: Api.Photo | undefined) => createAction(PhotosActionsEnum.SET_SHOWING_PHOTO, photo)
};

export type PhotosActions = ActionsUnion<typeof photosActions>;
