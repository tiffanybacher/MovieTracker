import React from 'react';
import { shallow } from 'enzyme';
import { SignUpForm, mapDispatchToProps } from './SignUpForm';
import { fetchNewUser } from '../../api/fetchNewUser';
import { fetchAllUsers } from '../../api/fetchAllUsers';
import { updateUser } from '../../actions';
import { mockUser } from '../../api/__tests__/mockData';

jest.mock('../../api/fetchNewUser');
jest.mock('../../api/fetchAllUsers')

const mockChangeEvent = {
  target: {
    name: 'name',
    value: 'Jacob'
  }
};
const mockSubmitEvent = {
  preventDefault: () => {}
};

const mockPasswords = {
  password: "A",
  passwordConfirm: "B"
};

describe('SignUpForm', () => {
  let wrapper, instance;
  let mockUpdateUser = jest.fn();
  let mockHistory = {
    push: jest.fn()
  }
  
  fetchNewUser.mockImplementation(() => Promise.resolve(1));
  fetchAllUsers.mockImplementation(() => Promise.resolve({
    data: [mockUser, mockUser]
  }));

  beforeEach(() => {
    wrapper = shallow(
      <SignUpForm 
        updateUser={mockUpdateUser} 
        history={mockHistory}
      />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    fetchNewUser.mockClear();
    fetchAllUsers.mockClear();
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a defult state', () => {
    const mockDefaultState = {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      error: ' '
    };

    wrapper = shallow(<SignUpForm />, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual(mockDefaultState);
  });

  describe('Event Handlers', () => {
    it('should invoke handleChange on input change', () => {
      wrapper.find("#signup-email-input").simulate('change', mockChangeEvent);
      expect(wrapper.state("name")).toEqual("Jacob");
    });

    it('should invoke handleSubmit on form submit', () => {
      wrapper.find(".signup-form-inputs").simulate('submit', mockSubmitEvent);
      expect(fetchAllUsers).toHaveBeenCalled();
    });
  });

  describe('handleChange', () => {
    it('should set the appropriate state to the input value', () => {
      instance.handleChange(mockChangeEvent);
      expect(wrapper.state('name')).toEqual('Jacob');
    });
  });

  describe("handleSubmit", () => {
    it('should set error in state to a single space', () => {
      instance.setState({ error: 'test error' });
      expect(wrapper.state('error')).toEqual('test error');

      instance.handleSubmit(mockSubmitEvent);
      expect(wrapper.state('error')).toEqual(' ');
    });

    it("should invoke fetchAllUsers", () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(fetchAllUsers).toHaveBeenCalled();
    });

    it('should invoke checkEmail method after fetchAllUsers resolves', async () => {
      jest.spyOn(instance, 'checkEmail');
      await instance.handleSubmit(mockSubmitEvent);
      expect(instance.checkEmail).toHaveBeenCalled();
    });

    it('should invoke checkPasswords method after fetchAllUsers resolves', async () => {
      instance.checkEmail = jest.fn();
      jest.spyOn(instance, 'checkPasswords');
      await instance.handleSubmit(mockSubmitEvent);
      expect(instance.checkPasswords).toHaveBeenCalled();
    });

    it('should invoke fetchNewUser if there are no errors in state', async () => {
      instance.checkEmail = jest.fn();
      instance.checkPasswords = jest.fn();
      await instance.handleSubmit(mockSubmitEvent);
      expect(fetchNewUser).toHaveBeenCalled();
    });

    it("should not invoke fetchNewUser if there are errors in state", async () => {
      instance.setState(mockPasswords);
      instance.checkEmail = jest.fn();
      await instance.handleSubmit(mockSubmitEvent);
      expect(fetchNewUser).not.toHaveBeenCalled();
    });

    it("should invoke updateUser", async () => {
      await instance.handleSubmit(mockSubmitEvent);
      expect(mockUpdateUser).toHaveBeenCalled();
    });

    it("should invoke the push method to change the route", async () => {
      await instance.handleSubmit(mockSubmitEvent);
      expect(mockHistory.push).toHaveBeenCalledWith('/');
    });
  });

  describe('checkEmail', () => {
    const mockUserData = [ { email: 'email@email.com' }, {email: 'test@test.com'}];

    it('should set an error in state if the given email matches any existing emails', () => {
      expect(wrapper.state('error')).toEqual(' ');
      instance.checkEmail(mockUserData, 'email@email.com');
      expect(wrapper.state('error')).toEqual('Email is already taken. Please try again.');
    });

    it('should set not an error in state if the given email is new', () => {
      expect(wrapper.state('error')).toEqual(' ');
      instance.checkEmail(mockUserData, 'new@new.com');
      expect(wrapper.state('error')).toEqual(' ');
    });
  });

  describe("checkPasswords", () => {
    it("should set an error in state if the passwords don't match", () => {
      expect(wrapper.state("error")).toEqual(" ");
      instance.checkPasswords('A', 'B');
      expect(wrapper.state("error")).toEqual(
        "Passwords do not match. Please try again."
      );
    });

    it("should set not an error in state if the given passwords match", () => {
      expect(wrapper.state("error")).toEqual(" ");
      instance.checkPasswords('A', 'A');
      expect(wrapper.state("error")).toEqual(" ");
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from MDTP', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = updateUser(1, 'Jacob');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateUser(1, 'Jacob');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});