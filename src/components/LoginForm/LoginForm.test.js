import { LoginForm } from './LoginForm';
import React from 'react';
import { shallow } from 'enzyme';

describe('LoginForm', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<LoginForm/>);
    instance = wrapper.instance();
  })
  
})