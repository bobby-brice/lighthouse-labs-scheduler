import React from "react";
import useVisualMode from "hooks/useVisualMode"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE"
    
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

  );

    return (
      <>
      <Header time={props.time}/>
      <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
      interviewers={props.interviewers}
      onSave={() => transition(SAVE)} onCancel={() => back()}/>}
      {mode === SHOW && (
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}  
        />
      )}
      </article>
      </>
    );
  }         
  
