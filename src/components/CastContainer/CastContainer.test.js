import { shallow } from "enzyme";
import React from "react";
import { CastContainer } from "./CastContainer";

const mockCastMember = {
  name: "Chris Evans",
  character: "Captain America",
  headshot: "fsdfasdfa.png",
  id: 1
};

const mockCast = [mockCastMember, mockCastMember]

describe("CastCard", () => {
  it("should match the snapshot", () => {
    let wrapper = shallow(<CastContainer cast={mockCast} />);
    expect(wrapper).toMatchSnapshot();
  });
});
