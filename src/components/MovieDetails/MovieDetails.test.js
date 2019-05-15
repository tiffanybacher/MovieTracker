import React from "react";
import { shallow } from "enzyme";
import MovieDetails from "./MovieDetails";
import { mockCleanMovie, mockCleanPeople, mockUser } from "../../api/mockData";

describe("MovieDetails", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MovieDetails 
        movieDetails={mockCleanMovie}
        people={mockCleanPeople}
        user={mockUser}
      />
    ); 
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});