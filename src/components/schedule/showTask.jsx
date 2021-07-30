import React from "react"

function ShowTask(props) {

  return (
    <div className="inputArea__task">
      <h4>{props.name}</h4>
      <p>Priority: {props.priority} | Time Needed: {props.hour}H</p>
    </div>
  )
}

export default ShowTask
