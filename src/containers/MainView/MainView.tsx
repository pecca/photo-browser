import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Dimmer, Loader, Button, Icon, Dropdown, Image, Divider, Popup } from 'semantic-ui-react';
import { PhotosActions, photosActions } from "../../actions/photosActions";
import { Photo } from "../../components/Photo/Photo";
import {userNotSelected, albumNotSelected} from "../../utils/photosUtils";
import styles from "./MainView.module.scss";

type StateProps = {
  /** Connected `photos` state */
  photos: State.Photos;
};

type DispatchProps = {
  /** Connected actions to handle `photos` */
  photosActions: typeof photosActions;
}

/**
 * MainView props
 */
export type MainViewProps = StateProps & DispatchProps;

/**
 * MainView component
 */
export class MainView extends React.Component<MainViewProps> {

  componentDidMount() {
    this.props.photosActions.fetchUsers();
    this.props.photosActions.fetchAlbums();
    this.props.photosActions.fetchPhotos();
  }

  render() {
    const { isFetching, showingPhoto, albums, users } = this.props.photos;
    if (isFetching) {
      return (
        <Dimmer active={true} inverted={true}>
          <Loader content='Loading' />
        </Dimmer>
      );
    } else if (showingPhoto) {
      let album: Api.Album | undefined;
      let user: Api.User | undefined;
      album = albums.find(album => album.id === showingPhoto.albumId);
      if (album) {
        const userId = album.userId;
        user = users.find(tempUser => tempUser.id === userId)
      }
      return (
        <div>
          <Photo
            photo={showingPhoto}
            album={album}
            user={user}
            hasCloseButton={true}
            handleClose={() => this.props.photosActions.setShowingPhoto(undefined)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Divider/>
          {this.renderPhotoFilter()}
          <Divider/>
          {this.renderPhotoResultsControl()}
          <Divider/>
          {this.renderPhotoResults()}
        </div>
      );
    }
  }

  /**
   * Renders photos in thumbnail format
   */
  private renderPhotoResults = () => {
    const { photos } = this.props.photos;
    return (
      <div className={styles.photoResults}>
        <Image.Group size='tiny'>
          {
            photos.map(photo =>
              <Popup
                key={photo.id}
                trigger={
                  <Image
                    src={photo.thumbnailUrl}
                    onClick={() => this.props.photosActions.setShowingPhoto(photo)}
                  />
                }
                header={`Title`}
                content={photo.title}
              />
            )
          }
        </Image.Group>
      </div>
    );
  }

  /**
   * Renders control of result photos
   */
  private renderPhotoResultsControl = () => {
    const { getPhotosLimit } = this.props.photos;

    // results per page options
    const photosLimitOptions = [10, 25, 50, 75, 100].map(limit => {
      return {key: limit, value: limit, text: limit}
    });

    return (
      <div className={styles.photoResultsControl}>
        <Button
          icon={true}
          disabled={this.isPreviousButtonDisabled()}
          onClick={this.handlePreviousButton}
        >
          <Icon name='arrow left' />
        </Button>
        <Button
          icon={true}
          disabled={this.isNextButtonDisabled()}
          onClick={this.handleNextButton}
        >
          <Icon name='arrow right' />
        </Button>
        <span className={styles.limitPage}>
          Results per page {' '}
          <Dropdown
            inline={true}
            options={photosLimitOptions}
            value={getPhotosLimit}
            onChange={(event, data) => this.handleLimitChanges(data.value as number)}
          />
        </span>
      </div>
    );
  }

  /**
   * Renders filter of result photos
   */
  private renderPhotoFilter = () => {
    const { users, selectedUser, albums, selectedAlbum } = this.props.photos;

    // Create user options for Dropdown
    const userOptions = users.map(user => {
      return {
        key: user.id,
        value: user.id,
        text: user.name
      };
    });
    userOptions.unshift({
      key: userNotSelected,
      value: userNotSelected,
      text: "All users"
    });

    // Create album options for Dropdown
    const selectableAlbums = albums.filter(album => {
      return selectedUser === userNotSelected || album.userId === selectedUser;
    });
    const albumOptions = selectableAlbums.map(album => {
      return {
        key: album.id,
        value: album.id,
        text: album.title
      };
    });
    albumOptions.unshift({
      key: albumNotSelected,
      value: albumNotSelected,
      text: "All albums"
    });

    return (
      <div className={styles.photoFilter}>
        <label> Select user </label>
        <Dropdown
          value={selectedUser}
          search={true}
          selection={true}
          options={userOptions}
          onChange={(event, data) => this.handleSelectUser(data.value as number)}
        />
        <label className={styles.selectAlbum}> Select album </label>
        <Dropdown
          value={selectedAlbum}
          search={true}
          selection={true}
          options={albumOptions}
          onChange={(event, data) => this.handleSelectAlbum(data.value as number)}
        />
      </div>
    );
  }

  /**
   * Handles next result button
   * @returns {void}
   */
  private handleNextButton = (): void => {
    let { getPhotosPage } = this.props.photos;
    getPhotosPage++;
    this.props.photosActions.setPage(getPhotosPage);
    this.props.photosActions.fetchPhotos();
  }

  /**
   * Handles previous result button
   * @returns {void}
   */
  private handlePreviousButton = (): void => {
    let { getPhotosPage } = this.props.photos;
    getPhotosPage--;
    this.props.photosActions.setPage(getPhotosPage);
    this.props.photosActions.fetchPhotos();
  }

  /**
   * Return status of previous button disabled
   * @returns {boolean}
   */
  private isPreviousButtonDisabled = (): boolean => {
    const { getPhotosPage } = this.props.photos;
    return (getPhotosPage === 1);
  }

  /**
   * Return status of next button disabled
   * @returns {boolean}
   */
  private isNextButtonDisabled = (): boolean => {
    const { getPhotosCount, getPhotosLimit } = this.props.photos;
    return (getPhotosLimit > getPhotosCount);
  }

  /**
   * Handles user selected
   * @param {number} userId
   * @returns {void}
   */
  private handleSelectUser = (userId: number): void => {
    this.props.photosActions.selectUser(userId);
    this.props.photosActions.setPage(1);
    this.props.photosActions.fetchPhotos();
  }

  /**
   * Handles album selected
   * @param {number} albumId
   * @returns {void}
   */
  private handleSelectAlbum = (albumId: number): void => {
    this.props.photosActions.selectAlbum(albumId);
    this.props.photosActions.setPage(1);
    this.props.photosActions.fetchPhotos();
  }

  /**
   * Handles limit changed
   * @param {number} limit
   * @returns {void}
   */
  private handleLimitChanges = (limit: number): void => {
    this.props.photosActions.setLimit(limit);
    this.props.photosActions.setPage(1);
    this.props.photosActions.fetchPhotos();
  }
}

const mapStateToProps = (state: State.Root) => ({
  photos: state.photos,
});

const mapDispatchToProps = (dispatch: Dispatch<PhotosActions>) => ({
  photosActions: bindActionCreators({ ...photosActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

