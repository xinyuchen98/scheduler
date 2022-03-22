import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Button from "components/Button";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Button />);
});

it("renders its `children` prop as text", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toBeInTheDocument();
});

it("renders a default button style", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toHaveClass("button");
});

it("renders a confirm button", () => {
  const { getByText } = render(<Button confirm>Confirm</Button>);
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});

it("renders a danger button", () => {
  const { getByText } = render(<Button danger>Danger</Button>);
  expect(getByText("Danger")).toHaveClass("button--danger");
});

it("renders a clickable button", () => {
  // Create a mock function
  const handleClick = jest.fn();

  // Render with the mock function created
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  // Find the clickable button
  const button = getByText("Clickable");

  // Click on the button
  fireEvent.click(button);

  // Check if the mock function is called
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("renders a disabled button", () => {
  // Create a mock function
  const handleClick = jest.fn();

  // Render with the mock function created
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  // Find the disabled button
  const button = getByText("Disabled");

  // Click on the button
  fireEvent.click(button);

  // Check if the mock function is not called
  expect(handleClick).toHaveBeenCalledTimes(0);
});
