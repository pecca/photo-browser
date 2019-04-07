
export const photosInitialState: State.Photos = {
  isFetching: false,
  users: [],
  albums: [],
  photos: [],
  selectedUser: -1,
  selectedAlbum: -1,
  getPhotosPage: 1,
  getPhotosLimit: 25,
  getPhotosCount: 0,
  showingPhoto: undefined
};

export const initialState: State.Root = {
  photos: photosInitialState
};
