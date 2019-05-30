import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SignUp from './containers/SignUp/SignUp';
import { shallow } from "enzyme";

describe("App component", () => {
  it("Test Render component using shallow", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SignUp)).toHaveLength(1);
  });
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
