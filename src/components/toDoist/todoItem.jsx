import React from "react"
import Delete from '@material-ui/icons/DeleteSweep';

function CreateList(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return(
    <div className="listItem">
      <h2> {props.taskTitle} </h2>
      <p className={props.tag} id={props.visibility}> {props.tag} <strong> | </strong> Due: {props.date} </p>
      <button onClick={handleClick} id="delete"> <Delete /> </button>
    </div>  
  )
}

export default CreateList
