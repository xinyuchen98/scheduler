import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// Add/Delete box
export default function Form(props) {
  // Manage states: student, interviewer, and error
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Reset all states
  const reset = function() {
    setStudent("");
    setError("");
    setInterviewer(null);
  }
  // Cancel on add or edit
  const cancel = function() {
    reset();
    props.onCancel();
  }

  // Validate the form
  function validate() {
    // If the student name input field is blank
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    // If the user does not select an interviewer
    if (interviewer === null) {
      setError("You must select an interviewer");
      return;
    }
    // Clear error message
    setError("");
    // Save the information
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* Student name input field */}
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        {/* Error message */}
        <section className="appointment__validation">{error}</section>
        {/* List of interviewers to select */}
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      {/* Buttons */}
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}