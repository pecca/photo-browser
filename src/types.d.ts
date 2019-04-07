
import { compose } from "redux";
import { TypedRecord } from "typed-immutable-record";
// import { MosaicNode } from "react-mosaic-component";
import { Notification } from "react-notification-system";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }

  module Api {
    interface Photo {
      albumId: number,
      id: number,
      title: string,
      url: string,
      thumbnailUrl: string
    }

    interface Album {
      userId: number,
      id: number,
      title: string,
    }

    interface User {
      id: number,
      name: string,
      username: string,
      email: string,
      address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
          lat: string,
          lng: string
        }
      },
      phone: string,
      website: string,
      company: {
        name: string,
        catchPhrase: string,
        bs: string
      }
    }
  }

  module State {
    interface Root {
      /** photos state */
      photos: Photos
    }

    interface Photos {
      isFetching: boolean,
      users: Api.User[],
      albums: Api.Album[],
      photos: Api.Photo[],
      selectedUser: number,
      selectedAlbum: number,
      getPhotosPage: number,
      getPhotosLimit: number,
      getPhotosCount: number,
      showingPhoto: Api.Photo | undefined
    }
  }
}
