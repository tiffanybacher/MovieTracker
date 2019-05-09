import React from "react";
import { shallow } from "enzyme";
import { SignUpForm, mapDispatchToProps } from "./SignUpForm";
import { fetchNewUser } from "../../api/fetchNewUser";

jest.mock("../../api/fetchNewUser");

describe("SignUpForm", () => {
  let wrapper, instance;
  let mockUpdateUser = jest.fn();
  fetchNewUser.mockImplementation(() => Promise.resolve(1));

  beforeEach(() => {
    wrapper = shallow(<SignUpForm updateUser={mockUpdateUser} />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    fetchNewUser.mockClear();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a defult state", () => {
    const mockDefaultState = {
      email: "",
      name: "",
      password: "",
      passwordConfirm: ""
    };
    wrapper = shallow(<SignUpForm />, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual(mockDefaultState);
  });

  describe('handleChange', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'Jacob'
      }
    };

    it('should set the appropriate state to the input value', () => {
      instance.handleChange(mockEvent);
      expect(wrapper.state('name')).toEqual('Jacob');
    });
  });

  describe("handleSubmit", () => {
    const mockEvent = {
      preventDefault: () => {}
    }
    it("should invoke fetchNewUser", () => {
      instance.handleSubmit(mockEvent);
      expect(fetchNewUser).toHaveBeenCalled();
    });

    it("should invoke updateUser", () => {
      instance.handleSubmit(mockEvent);
      expect(mockUpdateUser).toHaveBeenCalled();
    });
  });
});