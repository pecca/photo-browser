import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { match } from "react-router";
import { Dimmer, Loader } from 'semantic-ui-react';
import { PhotosActions, photosActions } from "actions/photosActions";
import Photo from "../../components/Photo/Photo";

type StateProps = {
  /** Connected `photos` state */
  photos: State.Photos;
};

type DispatchProps = {
  /** Connected actions to handle `photos` */
  photosActions: typeof photosActions;
}

type OwnProps = {
  match: match<{id: string}>;
}

/**
 * PhotoView props
 */
export type PhotoViewProps = StateProps & DispatchProps & OwnProps;

/**
 * PhotoView component
 */
export class PhotoView extends React.Component<PhotoViewProps> {

  componentDidMount() {
    const photoId = Number(this.props.match.params.id);
    this.props.photosActions.fetchPhoto(photoId);
    this.props.photosActions.fetchUsers();
    this.props.photosActions.fetchAlbums();
  }

  render() {
    const { showingPhoto, albums, users } = this.props.photos;
    if (showingPhoto && albums && users) {
      let album: Api.Album | undefined;
      let user: Api.User | undefined;
      album = albums.find(album => album.id === showingPhoto.albumId);
      if (album) {
        const userId = album.userId;
        user = users.find(tempUser => tempUser.id === userId)
      }
      return (
        <Photo
          photo={showingPhoto}
          album={album}
          user={user}
          hasCloseButton={false}
          handleClose={() => null}
        />
      )
    } else {
      return (
        <Dimmer active={true} inverted={true}>
          <Loader content='Loading' />
        </Dimmer>
      )
    }
  }
}

const mapStateToProps = (state: State.Root) => ({
  photos: state.photos,
});

const mapDispatchToProps = (dispatch: Dispatch<PhotosActions>) => ({
  photosActions: bindActionCreators({ ...photosActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoView);

