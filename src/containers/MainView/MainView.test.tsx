import * as React from "react";
// import * as _ from "lodash";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { shallow, mount } from "enzyme";
import rootReducer from "../../reducers/rootReducer";
import { photosActions } from "../../actions/photosActions";
import { initialState } from "../../reducers/initialState";
import { getMockActions } from "../../utils/utils";
import MainViewContainer, {MainViewProps, MainView} from "./MainView";

// test variables
export const user: Api.User = {
  id: 1,
  name: "user_",
  username: "",
  email: "s",
  address: {
    street: "lk",
    suite: "string",
    city: "sg",
    zipcode: "string",
    geo: {
      lat: "string",
      lng: "string"
    }
  },
  phone: "string",
  website: "string",
  company: {
    name: "string",
    catchPhrase: "string",
    bs: "string"
  }
};
export const album: Api.Album = {
    userId: 1,
    id: 1,
    title: "string",
};
export const photo: Api.Photo = {
    albumId: 1,
    id: 0,
    title: "title",
    url: "url",
    thumbnailUrl: "thumbnailUrl"
};

const expectedPhotosCount = 25;

const photos: Api.Photo[] = [];
for (let i = 0; i < expectedPhotosCount; i++) {
  photos.push({...photo, id: i});
}

describe("MainView tests", () => {

  let mockPhotosActions: typeof photosActions;
  let MainViewWrapper: JSX.Element;

  beforeEach(() => {
    mockPhotosActions = getMockActions<typeof photosActions>(photosActions);

    const photosState: State.Photos = {
      ...initialState.photos,
      getPhotosPage: 2,
      getPhotosLimit: 25,
      getPhotosCount: 25,
      users: [user],
      albums: [album],
      photos
    }

    const mainViewPros: MainViewProps = {
      photos: photosState,
      photosActions: mockPhotosActions
    };
    MainViewWrapper = (
      <MainView
        {...mainViewPros}
      />
    );
  });

  it("mounts the container without crashing", () => {
    const store = createStore(rootReducer);
    mount(
      <Provider store={store}>
        <MainViewContainer/>
      </Provider>
    );
  });

  it("Fetches users, albums, photos after mounting", () => {
    shallow(MainViewWrapper);
    expect(mockPhotosActions.fetchPhotos).toHaveBeenCalledTimes(1);
    expect(mockPhotosActions.fetchUsers).toHaveBeenCalledTimes(1);
    expect(mockPhotosActions.fetchAlbums).toHaveBeenCalledTimes(1);
  });

  it("Selects next results", () => {
    const wrapper = shallow(MainViewWrapper);
    expect(wrapper.find("ImageGroup Popup")).toHaveLength(expectedPhotosCount);
    const nextButton = wrapper.find("Button").at(1);
    nextButton.simulate("click");
    expect(mockPhotosActions.setPage).toHaveBeenCalledTimes(1);
    expect(mockPhotosActions.setPage).toHaveBeenLastCalledWith(3);
    expect(mockPhotosActions.fetchPhotos).toHaveBeenCalledTimes(2);
  });
})
