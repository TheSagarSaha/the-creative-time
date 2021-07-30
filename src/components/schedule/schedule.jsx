import React from "react"
import ShowTask from "./showTask"
import CreateScheduledTasks from "./scheduletasks"

var i = 0, d = -1, a = -1
var setTime = []

function Schedule() {

  //  Set up input feilds

  const [taskName, setTaskName] = React.useState("")
  const [hours, setHours] = React.useState("")
  const [priority, setPriority] = React.useState("")
  const [tasksArr, setTasksArr] = React.useState([])
  const [scheduledTask, setScheduledTask] = React.useState([])
  const [valid, setValid] = React.useState(true)
  const [show, setShow] = React.useState(false)
  var [startTime, setStartTime] = React.useState("")

  //  Handle Function when text is inputted

  function handleText(event) { setTaskName(event.target.value) }
  function handleHour(event) { setHours(event.target.value) }
  function handlePriority(event) { setPriority(event.target.value) }
  function handleStartTime(event) { setStartTime(event.target.value) }

  function handleAddButton() {
    if (taskName !== "" && hours !== "" && priority !== "") {
      i++
      setTasksArr(prevTasks => {
        return [...prevTasks, {
          id: i,
          name: taskName,
          hourNeeded: hours,
          priority: priority
        }]
      })
      setTaskName("")
      setHours("")
      setPriority("")
      setValid(true)
      setShow(true)

    } else { setValid(false) }
  }

  function onSchedule() {

    //  Sort the tasks according to their priority

    function compare( a, b ) {
      if ( a.priority < b.priority ) {
        return -1;
      }
      if ( a.priority > b.priority ) {
        return 1;
      }
      return 0;
    }

    tasksArr.sort(compare);

    //  Find and save the start time hour

    startTime = startTime.split(":")
    var startTimeH = Number(startTime[0])
    var startTimeM = Number(startTime[1])
    var endTimeH = Number(startTime[0])
    var endTimeM = Number(startTime[1])

    const startHours = startTimeH
    var startTimeMeridian = startTimeH, set_start_meridian

    for (let j = 0; j < tasksArr.length; j++) {
      const element = tasksArr[j];

      endTimeH += Number(element.hourNeeded)
      if (endTimeH > 12) {
        endTimeH -= 12
      }

      // Find whether the time is in AM/PM
      
      if (startTimeMeridian > 12) {
        set_start_meridian = 'PM';
        startTimeMeridian -= 12;
      } else if (startTimeMeridian < 12) {
        set_start_meridian = 'AM';
        if (startTimeMeridian === 0) {
          startTimeMeridian = 12;
        }
      } else {
        set_start_meridian = 'PM';
      }
      startTimeMeridian = Number(element.hourNeeded) + startHours

      var endTimeMeridian = startTimeMeridian, set_end_meridian
      if (endTimeMeridian > 12) {
        set_end_meridian = 'PM';
        endTimeMeridian -= 12;
      } else if (endTimeMeridian < 12) {
        set_end_meridian = 'AM';
        if (endTimeMeridian === 0) {
          endTimeMeridian = 12;
        }
      } else {
        set_end_meridian = 'PM';
      }

      // Push all the information into an array

      setTime.push({
        id: element.id,
        startTimeHour: startTimeH,
        startTimeMin: startTimeM,
        startMeridian: set_start_meridian,
        endTimeHour: endTimeH,
        endTimeMin: startTimeM,
        endMeridian: set_end_meridian
      })

      // Add the time needed with the start time hour

      startTimeM = Number(startTimeM)
      startTimeH += Number(element.hourNeeded)
      if (startTimeH > 12) {
        startTimeH -= 12
      }

      if (endTimeM + 15 >= 60) {
        var minuteCount = startTimeM + 15
        startTimeM = minuteCount - 60
        startTimeH++
        endTimeH++
      } else {
        startTimeM += 15
      }

      if (startTimeM < 10) {
        startTimeM = "0" + startTimeM
      }
      
      endTimeM = startTimeM;

    }

    tasksArr.map(task => {
      return (
        setScheduledTask(prevScheduledTasks => {
          d++
          return [...prevScheduledTasks, {
            taskStartHour: setTime[d].startTimeHour,
            taskStartMin: setTime[d].startTimeMin,
            taskStartMeridan: setTime[d].startMeridian,
            taskName: task.name,
            taskID: task.id,
            taskPriority: task.priority,
            taskEndHour: setTime[d].endTimeHour,
            taskEndMin: setTime[d].endTimeMin,
            taskEndMeridan: setTime[d].endMeridian
          }]
        })
      )
    })

  } 
  
  return (
    <div className="inputArea">
      <div className="main">
        <h1 style={{marginBottom: "0"}}>The Creative Scheduler</h1>
        <h3>Please specify the start and end time for your work schedule:</h3>
        <input className="time" name="startTime" type="time" onChange={handleStartTime}/>
        <input className="time" name="endTime" type="time" />        

        <h3> Please enter what things you need to do for today, their priority and the amount of time you need to do it: </h3>
        <input
          className="priority"
          name="priority"
          type="number"
          placeholder="Priority [Eg: 1]"
          onChange={handlePriority}
          value={priority}
        />
        <input
          style={{marginBottom: "15px"}}
          name="taskName"
          placeholder="Task Name:"
          type="text"
          value={taskName}
          onChange={handleText}
          autoComplete="off"
        />
        <input
          style={{width: "15%", marginLeft: "15px"}}
          name="hours"
          placeholder="Hours Required"
          type="number"
          value={hours}
          onChange={handleHour}
        />
        <button className="add" onClick={handleAddButton}>+</button>
        <h5
          style={valid ? { display: "none" } : { display: "block", color: "red" }}>
          Please provide with all the required feilds above.
        </h5>

        {tasksArr.map(task => (
          <ShowTask
            name={task.name}
            hour={task.hourNeeded}
            priority={task.priority}
            key={task.id}
          />
        ))}

        <button
          style={show ? { display: "block" } : { display: "none" }}
          className="calculate"
          onClick={onSchedule}
        >
          Schedule the Tasks
        </button>
      </div>

      <div className="scheduledArea">
      
        <h2 style={{ textAlign: "left", paddingLeft: "5.5%" }}>Scheduled Tasks Will Show Up Here:</h2>
        {scheduledTask.map(task => (
          <CreateScheduledTasks
            taskTitle={task.taskName}
            priority={task.taskPriority}
            startHour={task.taskStartHour}
            startMin={task.taskStartMin}
            startMeridian={task.taskStartMeridan}
            endHour={task.taskEndHour}
            endMin={task.taskEndMin}
            endMeridian={task.taskEndMeridan}
            key={a++}
          />
        ))}

      </div>
    </div>    
  )
}

export default Schedule
