export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(item => item.name === day);
  const appointments = [];
  if (dayObj) {
    for (const aptId in state.appointments) {
      if (dayObj.appointments.includes(state.appointments[aptId].id)) {
        appointments.push(state.appointments[aptId]);
      }
    }
  }
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(item => item.name === day);
  const interviewers = [];
  if (dayObj) {
    for (const itvrId in state.interviewers) {
      if (dayObj.interviewers.includes(state.interviewers[itvrId].id)) {
        interviewers.push(state.interviewers[itvrId]);
      }
    }
  }
  return interviewers;
}

export function getInterview(state, interview) {
  if (interview) {
    return { ...interview, interviewer: state.interviewers[interview.interviewer]};
  } else {
    return null;
  }
}