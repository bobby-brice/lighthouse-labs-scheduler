import React from "react";
import useVisualMode from "hooks/useVisualMode"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const CONFIRM = 'CONFIRM'
  const DELETING = 'DELETING'
  const EDIT = 'EDIT'
  const ERROR_SAVE = 'ERROR'
  const ERROR_DELETE = "ERROR"
    
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));  
    }

    function deleteInterview() {
      transition(DELETING)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
    }


    return (
      <>
      <Header time={props.time}/>
      <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
      interviewers={props.interviewers}
      onSave={save} onCancel={() => back()}  
      />}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === SHOW && (
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}  
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && <Form
        name={props.interview.student} 
        interviewers={props.interviewers} 
        interviewer={props.interview.interviewer.id}
        onSave={save} onCancel={() => back()}
      />}
      
      {mode === CONFIRM && <Confirm 
        message={'Are you sure you want to cancel?'}
        onCancel={() => back()}
        onConfirm={deleteInterview}  
      />}
      {mode === DELETING && <Status 
        message="Deleting"
      />}
      {mode === ERROR_SAVE && <Error message="oops and error occurred while saving"
        onClose={back}
      />}
      {mode === ERROR_DELETE && <Error message="oops and error occurred while deleting"
        onClose={back}
      />}
      
      </article>
      </>
    );
  }         
  
