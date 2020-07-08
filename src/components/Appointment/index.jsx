import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  
  
  if (props.interview) {
    return (
      <>
      <Header time={props.time}/>
      <article className="appointment">
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}  
        />
      </article>
      </>
    );
  } else {
        return (
        <>
          <Header time={props.time}/>
          <article className="appointment">
          <Empty />
          </article>
        </>
    );
  }
}