import React from "react";
import { shallow } from "enzyme";
import { LoginForm, mapDispatchToProps } from "./LoginForm";
import { fetchSignIn } from "../../api/fetchSignIn";
import { updateUser } from "../../actions";

jest.mock("../../api/fetchSignIn");

const mockChangeEvent = {
  target: {
    name: "email",
    value: "email@email.com"
  }
};

const mockSubmitEvent = {
  preventDefault: () => {}
};

describe("LoginForm", () => {
  let wrapper, instance;
  let mockUpdateUser = jest.fn();
  let mockHideLogin = jest.fn();
  fetchSignIn.mockImplementation(() => Promise.resolve(1));

  beforeEach(() => {
    wrapper = shallow(
    <LoginForm 
      updateUser={mockUpdateUser} 
      hideLogin={mockHideLogin}
    />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    fetchSignIn.mockClear();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a defult state", () => {
    const mockDefaultState = {
      email: "",
      password: "",
      error: false
    };
    wrapper = shallow(<LoginForm />, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual(mockDefaultState);
  });

  describe('Event Handlers', () => {
    it('should invoke handleChange on input change', () => {
      wrapper.find('#email-input').simulate('change', mockChangeEvent);
      expect(wrapper.state("email")).toEqual("email@email.com");
    });

    it('should invoke handleSubmit on form submit', () => {
      wrapper.find(".LoginForm").simulate('submit', mockSubmitEvent);
      expect(fetchSignIn).toHaveBeenCalled();
    })
  });

  describe("handleChange", () => {
    it("should set the appropriate state to the input value", () => {
      instance.handleChange(mockChangeEvent);
      expect(wrapper.state("email")).toEqual("email@email.com");
    });
  });

  describe("handleSubmit", () => {
    it("should invoke fetchSignIn", () => {
      instance.handleSubmit();
      expect(fetchSignIn).toHaveBeenCalled();
    });

    it("should invoke updateUser", () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(mockUpdateUser).toHaveBeenCalled();
    });

    it("should invoke hideLogin", () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(mockHideLogin).toHaveBeenCalled();
    });

    it('should set error in state to true if fetch fails', async () => {
      fetchSignIn.mockImplementation(() => Promise.reject());
      await instance.handleSubmit(mockSubmitEvent);
      expect(wrapper.state('error')).toEqual(true);
    })
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
