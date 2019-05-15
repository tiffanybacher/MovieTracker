import { shallow } from 'enzyme';
import React from 'react';
import CastCard from './CastCard';

const mockCastMember = {
  name: 'Chris Evans',
  character: "Captain America",
  headshot: 'fsdfasdfa.png'
}

describe('CastCard', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<CastCard data={mockCastMember}/>);
    expect(wrapper).toMatchSnapshot();
  });
});