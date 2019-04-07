export const userNotSelected = -1;
export const albumNotSelected = -1;

export const getAlbumIdsByUser = (userId: number, albums: Api.Album[]): number[] => {
  const foundAlbumIds: number[] = [];
  albums.forEach(album => {
    if (album.userId === userId && !foundAlbumIds.find(albumId => albumId === album.id)) {
      foundAlbumIds.push(album.id);
    }
  });
  return foundAlbumIds;
}