import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => setState(prev => ({ ...prev, appointments, days: updateSpots(appointments) })));
  }

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({ ...prev, appointments, days: updateSpots(appointments) })));
  }

  const setDay = day => setState(prev => ({ ...prev, day }));

  const updateSpots = function(appointments) {
    let days = [...state.days];
    for (let day of days) {
      let spots = 0;
      for (const id of day.appointments) {
        if (appointments[id].interview === null) {
          spots ++;
        }
      }
      day.spots = spots;
    }
    return days;
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'), 
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return { state, bookInterview, cancelInterview, setDay };
}