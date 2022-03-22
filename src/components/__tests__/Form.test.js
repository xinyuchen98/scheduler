import React from "react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

import { fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("Form", () => {
  // Mock interviewers data
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    // Create a mock function
    const onSave = jest.fn();

    // Render with the mock function created
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    // Find and click on the save button
    fireEvent.click(getByText("Save"));

    // Check if validation is shown
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    // Check if onSave is not called
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("can successfully save after trying to submit an empty student name", () => {
    // Create a mock function
    const onSave = jest.fn();

    // Render with the mock function created and empty name
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    // Find and click on the save button
    fireEvent.click(getByText("Save"));
  
    // Check if the error message is shown
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    // Check if onSave function is not called
    expect(onSave).not.toHaveBeenCalled();
  
    // Find and type name into name input field
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    // Find and click on the save button
    fireEvent.click(getByText("Save"));
  
    // Check if the error message is not shown
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    // Check if onSave function is called
    expect(onSave).toHaveBeenCalledTimes(1);

    // Check if onSave function is called with the correct student name
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    // Create a mock function
    const onCancel = jest.fn();

    // Render with complete information
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    // Find and click on the save button
    fireEvent.click(getByText("Save"));
  
    // Find and type name into name input field
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    // Find and click on the cancel button
    fireEvent.click(getByText("Cancel"));
  
    // Check if the error message is not shown
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    // Check if the student name input field is empty
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    // Check if onCancel function is called
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});