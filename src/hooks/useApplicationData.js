import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({
    ...state,
    day
  });

function getUpdatedDays(newAppointments) {
  return state.days.map((day, id) => {
    let availSpots = 0;

    for (let key of state.days[id].appointments) {
      if (newAppointments[key].interview === null) {
        availSpots++
      }
    }

    const newDay = {
      ...day,
      spots: availSpots
    }
    return newDay
  })
}

  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: {
            ...interview
          }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const updateDays = getUpdatedDays(appointments)

        setState({
          ...state,
          appointments,
          days: updateDays
        })
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updatedDays = getUpdatedDays(appointments)
    

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updatedDays
        })
      })
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      

      setState(prev => ({ ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    }).catch(error => console.log(error))
  }, [])

  return {state, setDay, bookInterview, cancelInterview}
}

  