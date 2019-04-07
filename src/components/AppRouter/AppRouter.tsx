import * as React from "react";
import { Route } from 'react-router-dom';
import PhotoView from "../../containers/PhotoView/PhotoView";
import MainView from "../../containers/MainView/MainView";

/**
 * AppRouter component
 */
export const AppRouter: React.SFC<{}> = ({}) =>
  <div>
    <Route exact={true} path="/" component={MainView}/>
    <Route path="/photo/:id" component={PhotoView}/>
  </div>

export default AppRouter;