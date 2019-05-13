import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { cleanAllMovies } from '../../api/cleaners';
import { mockUncleanMovie } from '../../api/__tests__/mockData';
import { fetchMovies } from '../../thunks/fetchMovies';

jest.mock('../../thunks/fetchMovies');
jest.mock('../../api/cleaners.js');

describe('App', () => {
  let wrapper, instance;
  let mockSetMovies = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(<App setMovies={mockSetMovies}/>);
    instance = wrapper.instance();
  });

  afterEach(() => {
    mockSetMovies.mockClear();
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a defult state', () => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual({ error: ''});
  });

  it('CDM should call setMovies method', () => {
    expect(mockSetMovies).toHaveBeenCalled();
  });
});
