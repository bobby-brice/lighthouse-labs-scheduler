import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Benjamin Button",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Johnny Walker",
      interviewer: {
        id: 2,
        name: "Tori Macolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "12pm",
  },
  {
    id: 5,
    time: "12pm",
    interview: {
      student: "Susan Summers",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
];

export default function Application(props) {

  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    axios.get("/api/days")
      .then(response => setDays(response.data))
      .catch(error => console.log(error))
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointments.map((appointment, i) => 
      <Appointment
        key={appointment.id} {...appointment}   

      />)}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
