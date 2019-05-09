import React from "react";
import { shallow } from "enzyme";
import { SignUpForm, mapDispatchToProps } from "./SignUpForm";
import { fetchNewUser } from "../../api/fetchNewUser";

jest.mock("../../api/fetchNewUser");

const mockChangeEvent = {
  target: {
    name: "name",
    value: "Jacob"
  }
};
const mockSubmitEvent = {
  preventDefault: () => {}
};

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

  describe('Event Handlers', () => {
    it('should invoke handleChange on input change', () => {
      wrapper.find("#signup-email-input").simulate('change', mockChangeEvent);
      expect(wrapper.state("name")).toEqual("Jacob");
    });

    it('should invoke handleSubmit on form submit', () => {
      wrapper.find(".signup-form-inputs").simulate('submit', mockSubmitEvent);
      expect(fetchNewUser).toHaveBeenCalled();
    });

  });

  describe('handleChange', () => {
    it('should set the appropriate state to the input value', () => {
      instance.handleChange(mockChangeEvent);
      expect(wrapper.state('name')).toEqual('Jacob');
    });
  });

  describe("handleSubmit", () => {
    it("should invoke fetchNewUser", () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(fetchNewUser).toHaveBeenCalled();
    });

    it("should invoke updateUser", () => {
      instance.handleSubmit(mockSubmitEvent);
      expect(mockUpdateUser).toHaveBeenCalled();
    });
  });
});