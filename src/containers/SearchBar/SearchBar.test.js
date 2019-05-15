import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar, mapDispatchToProps } from "./SearchBar";
import { fetchMovies } from '../../thunks/fetchMovies';

jest.mock('../../thunks/fetchMovies');
const mockFetchSearch = jest.fn();
const mockSubmitEvent = {
  preventDefault: () => {}
};
const mockChangeEvent = {
  target: { value: "The Parent Trap" }
};
const mockHistory = { push: jest.fn() }



describe('SearchBar', () => {
  let wrapper, instance;

  beforeEach(()=> {
    wrapper = shallow(<SearchBar fetchSearch={mockFetchSearch} history={mockHistory}/>);
    instance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({ query: '' });
  });

  describe('handleChange', () => {
    it('should set state to the input value', () => {
      expect(wrapper.state('query')).toEqual('');
      instance.handleChange(mockChangeEvent);
      expect(wrapper.state('query')).toEqual('The Parent Trap');
    });
  });

  describe('handleSubmit', () => {
    it('should invoke the fetchSearch method', () => {
      instance.handleChange(mockChangeEvent);
      instance.handleSubmit(mockSubmitEvent);
      expect(instance.props.fetchSearch).toHaveBeenCalledWith('search', 'The Parent Trap');
    });
    
    it('should invoke the push method of router history', () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(instance.props.history.push).toHaveBeenCalledWith('/search');
    });
  });

  describe('clearInput', () => {
    it('should reset the query property of state', () => {
      instance.handleChange(mockChangeEvent);
      expect(wrapper.state('query')).toEqual('The Parent Trap');
      instance.clearInput();
      expect(wrapper.state('query')).toEqual('');
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with using the fetchSearch method', () => {
      const mockDispatch = jest.fn();
      const thunkToDispatch = fetchMovies('search', 'The Parent Trap');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchSearch('search', 'The Parent Trap');
      expect(mockDispatch).toHaveBeenCalledWith(thunkToDispatch);
    });
  });
});