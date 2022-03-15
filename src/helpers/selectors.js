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