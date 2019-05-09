import React from "react";
import { shallow } from "enzyme";
import { LoginForm, mapDispatchToProps } from "./LoginForm";
import { fetchSignIn } from "../../api/fetchSignIn";

jest.mock("../../api/fetchSignIn");

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

  describe("handleChange", () => {
    const mockEvent = {
      target: {
        name: "email",
        value: "email@email.com"
      }
    };

    it("should set the appropriate state to the input value", () => {
      instance.handleChange(mockEvent);
      expect(wrapper.state("email")).toEqual("email@email.com");
    });
  });

  describe("handleSubmit", () => {
    const mockEvent = {
      preventDefault: () => {}
    };
    it("should invoke fetchSignIn", () => {
      instance.handleSubmit(mockEvent);
      expect(fetchSignIn).toHaveBeenCalled();
    });

    it("should invoke updateUser", () => {
      instance.handleSubmit(mockEvent);
      expect(mockUpdateUser).toHaveBeenCalled();
    });

    it("should invoke toggleLogin", () => {
      instance.handleSubmit(mockEvent);
      expect(mockToggleLogin).toHaveBeenCalled();
    });
  });
});
