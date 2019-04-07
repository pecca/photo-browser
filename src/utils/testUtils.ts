import * as React from "react";
import { ReactWrapper } from "enzyme";

// tslint:disable-next-line:no-any
export const withinRouter = (wrapper: ReactWrapper<any, any>, props: any) => {
  return {
    children: React.cloneElement(wrapper.props().children, props)
  };
};
