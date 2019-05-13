import Footer from "./Footer";
import { shallow } from 'enzyme';
import React from 'react';

describe('Footer', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});