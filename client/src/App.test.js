import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

describe("App component", () => {
  it("Test Render component using shallow", () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find("h1").text();
    expect(text).toEqual("Client");
  });
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
