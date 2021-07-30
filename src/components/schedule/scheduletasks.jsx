import React from "react"

function createScheduledTasks(props) {
  return (
    <div className="scheduledTask">
      <h3>{props.taskTitle}</h3>
      <p> Priority: {props.priority} | {props.startHour}:{props.startMin} {props.startMeridian} - {props.endHour}:{props.endMin} {props.endMeridian} </p> 
    </div>
  )
}

export default createScheduledTasks
