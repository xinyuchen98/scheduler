import React from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // Custom hook handles states and actions on data
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}  // Add unique keys for appointments
          {...appointment}
          interview={getInterview(state, appointment.interview)}  // Add the interview information
          interviewers={interviewers} // Add the list of available interviewers
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        {/* List of days on the sidebar */}
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />  
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      {/* Schedule of all appointments */}
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
