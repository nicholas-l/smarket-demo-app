import React from "react";
import { render } from "@testing-library/react";
import Select from "../Select";
import { SmarketsEventType } from "../SmarketsEvent";

it("renders the title and helper text", () => {
  const values: ReadonlyArray<string> = [];
  const handleChange = () => {};
  const { getByText } = render(
    <Select
      id="test-id"
      title="Test Title"
      value=""
      values={values}
      onChange={handleChange}
      helper="Helper Text Here"
    />
  );
  expect(getByText("Test Title")).toBeInTheDocument();
  expect(getByText("Helper Text Here")).toBeInTheDocument();
});
