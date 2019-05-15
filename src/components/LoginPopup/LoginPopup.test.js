import LoginPopup from "./LoginPopup";
import { shallow } from "enzyme";
import React from "react";

describe("LoginPopup", () => {
  it("should match the snapshot", () => {
    let wrapper = shallow(<LoginPopup />);
    expect(wrapper).toMatchSnapshot();
  });
});
