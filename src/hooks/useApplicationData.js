// custom hook for the application, initialize data from api and actions
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // initialize states from scratch
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  // add or edit an interview in the time slot with id
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // update the appointment the database on cloud and then to the local
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => setState(prev => ({ ...prev, appointments, days: updateSpots(appointments) })));
  }

  // delete an interview in the time slot with id
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // delete the interview in the database on cloud and then to the local
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({ ...prev, appointments, days: updateSpots(appointments) })));
  }

  // method to update the current day selected
  const setDay = day => setState(prev => ({ ...prev, day }));

  // update the spots remaining for appointments of each day on the sidebar
  const updateSpots = function(appointments) {
    let days = [...state.days];
    // loop through each day
    for (let day of days) {
      let spots = 0;
      // count the spots with empty interview
      for (const id of day.appointments) {
        if (appointments[id].interview === null) {
          spots ++;
        }
      }
      day.spots = spots;
    }
    // return the new days array to update
    return days;
  }

  // load data from cloud
  useEffect(() => {
    // get days array, appointments object, and interviewers object from cloud ans use setState to store them
    // only execute once when the page loads up
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'), 
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // return the states for access and the helper functions
  return { state, bookInterview, cancelInterview, setDay };
}