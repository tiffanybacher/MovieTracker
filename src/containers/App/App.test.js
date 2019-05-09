import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import fetchDiscover from '../../api/fetchDiscover';
import { cleanAllMovies } from '../../api/cleaners';
import { mockUncleanMovie } from '../../api/mockData';


jest.mock('../../api/fetchDiscover.js');
jest.mock('../../api/cleaners.js');

describe('App', () => {
  let wrapper, instance;
  let mockAddDiscoverMovies = jest.fn();
  fetchDiscover.mockImplementation(() => Promise.resolve([mockUncleanMovie]));
  
  beforeEach(() => {
    wrapper = shallow(<App addDiscoverMovies={mockAddDiscoverMovies}/>);
    instance = wrapper.instance();
  });

  afterEach(() => {
    fetchDiscover.mockClear();
    cleanAllMovies.mockClear();
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a defult state', () => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual({ error: ''});
  });

  it('CDM should call setDisoverMovies method', () => {
    jest.spyOn(instance, 'setDiscoverMovies');
    instance.componentDidMount();
    expect(instance.setDiscoverMovies).toHaveBeenCalled();
  });

  describe('setDiscoverMovies', () => {
    it("should invoke fetchDiscover", () => {
      instance.setDiscoverMovies();
      expect(fetchDiscover).toHaveBeenCalled();
    });

    it('should invoke cleanAllMovies', () => {
      instance.setDiscoverMovies();
      expect(cleanAllMovies).toHaveBeenCalled();
    });

    it('should invoke addDiscoverMovies', () => {
      instance.setDiscoverMovies();
      expect(mockAddDiscoverMovies).toHaveBeenCalled();
    });

    it.skip('should set error message in state if response not ok', async () => {
      fetchDiscover.mockImplementation(() =>
        Promise.resolve({ ok: false}));
      await instance.setDiscoverMovies();
      expect(wrapper.state('error')).toEqual('Discover failed to fetch');
    });
  });

  
});
