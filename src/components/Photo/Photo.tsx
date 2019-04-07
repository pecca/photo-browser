import * as React from "react";
import { Icon, Card, Image } from 'semantic-ui-react';
import styles from "./Photo.module.scss";

/**
 * Photo props
 */
type PhotoProps = {
  photo: Api.Photo;
  album: Api.Album | undefined;
  user: Api.User | undefined ;
  hasCloseButton: boolean;
  handleClose: () => void;
}

/**
 * Photo component
 */
export const Photo: React.SFC<PhotoProps> = ({photo, album, user, hasCloseButton, handleClose }) =>
  <div>
    <div className={styles.photo}>
      <Card>
        <Image src={photo.url}/>
        { (album && user) &&
          <Card.Content>
            <Card.Header>Title</Card.Header>
            <Card.Description>{photo.title}</Card.Description>
            <br/>
            <Card.Header>Album</Card.Header>
            <Card.Description>{album.title}</Card.Description>
            <br/>
            <Card.Header>User</Card.Header>
            <Card.Description>{user.name}</Card.Description>
            <br/>
            <Card.Header>Link</Card.Header>
            <Card.Description>
              {hasCloseButton ? `${window.location.href}photo/${photo.id}` : window.location.href}
            </Card.Description>
          </Card.Content>
        }
      </Card>
      { hasCloseButton &&
        <Icon size="large" name="close" onClick={handleClose}/>
      }
    </div>
  </div>

export default Photo;