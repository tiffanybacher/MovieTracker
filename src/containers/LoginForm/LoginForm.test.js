import React from "react";
import { shallow } from "enzyme";
import { LoginForm, mapDispatchToProps } from "./LoginForm";
import { fetchSignIn } from "../../api/fetchSignIn";

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
  let mockToggleLogin = jest.fn();
  fetchSignIn.mockImplementation(() => Promise.resolve(1));

  beforeEach(() => {
    wrapper = shallow(
    <LoginForm 
      updateUser={mockUpdateUser} 
      toggleLogin={mockToggleLogin}
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
      password: ""
    };
    wrapper = shallow(<LoginForm />, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual(mockDefaultState);
  });

  describe('Event Listeners', () => {
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
      instance.handleSubmit(mockSubmitEvent);
      expect(fetchSignIn).toHaveBeenCalled();
    });

    it("should invoke updateUser", () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(mockUpdateUser).toHaveBeenCalled();
    });

    it("should invoke toggleLogin", () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(mockToggleLogin).toHaveBeenCalled();
    });
  });
});
