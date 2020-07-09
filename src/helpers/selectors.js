
export default function getAppointmentsForDay(state, day) {
  //empty array to push appointment results
  let dayArr = [];
    
  //find the object in our state.days array matching day provided
  const findDay = state.days.find(item => item.name === day)
  //--> { id: 1, name: 'Monday, appointments: [...] }


  //no day is found return the empty arr
  if (!findDay) {
    return dayArr;
  }

  //if there are no appointments - return the empty array
  if (findDay.appointments.length === 0) {
    return dayArr;
  }
  //iterate through the day obj-appointment array
  for (const id of findDay.appointments) {
    //push each appointment from state.appointments with the same id as the findDay obj id
      dayArr.push(state.appointments[id]);

  }
return dayArr;

}