// Get appointments in the state with given day
export function getAppointmentsForDay(state, day) {
  // Find the day object with day name
  const dayObj = state.days.find(item => item.name === day);
  const appointments = [];
  if (dayObj) {
    // Iterate through appointments in the state
    for (const aptId in state.appointments) {
      // Find the appointments with id that is in the day object
      if (dayObj.appointments.includes(state.appointments[aptId].id)) {
        appointments.push(state.appointments[aptId]);
      }
    }
  }
  return appointments;
}

// Get interviewers in the state with given day
export function getInterviewersForDay(state, day) {
  // Find the day object with day name
  const dayObj = state.days.find(item => item.name === day);
  const interviewers = [];
  if (dayObj) {
    // Iterate through interviewers in the state
    for (const itvrId in state.interviewers) {
      // Find the interviewers with id that is in the day object
      if (dayObj.interviewers.includes(state.interviewers[itvrId].id)) {
        interviewers.push(state.interviewers[itvrId]);
      }
    }
  }
  return interviewers;
}

// Get interviewer information for an appointment given the student name and interviewerId
export function getInterview(state, interview) {
  if (interview) {
    return { ...interview, interviewer: state.interviewers[interview.interviewer]};
  } else {
    return null;
  }
}