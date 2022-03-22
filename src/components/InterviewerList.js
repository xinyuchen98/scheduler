import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id}  // Add unique keys for interviewers
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value} // Check if the interviewer is selected
        setInterviewer={() => props.onChange(interviewer.id)} // Function to choose an interviewer
      />
    );
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

// Check the type of interviewers and make it required
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;