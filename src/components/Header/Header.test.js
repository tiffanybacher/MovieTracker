import Header from "./Header";
import { shallow } from "enzyme";
import React from "react";

describe("Header", () => {
  it("should match the snapshot", () => {
    let wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
