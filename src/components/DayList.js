import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days } = props;
   
  return (
    <ul>
      {days.map((day, i) => 
      <DayListItem
        key={i} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />)}
    </ul>
  );
}