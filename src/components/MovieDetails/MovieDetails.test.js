import React from "react";
import { shallow } from "enzyme";
import { MovieDetails } from "./MovieDetails";
import { mockCleanMovie, mockCleanPeople } from "../../api/mockData";

describe("MovieDetails", () => {
  it("should match the snapshot", () => {
    let wrapper = shallow(
      <MovieDetails 
        movieDetails={mockCleanMovie}
        people={mockCleanPeople}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});