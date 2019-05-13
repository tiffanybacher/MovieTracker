import React from "react";
import { shallow } from "enzyme";
import { MovieDetails } from "./MovieDetails";
import { cleanMovie, cleanPeople } from "../../api/__tests__/mockData";

describe("MovieDetails", () => {
  it("should match the snapshot", () => {
    let wrapper = shallow(
      <MovieDetails 
        movieDetails={cleanMovie}
        people={cleanPeople}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});