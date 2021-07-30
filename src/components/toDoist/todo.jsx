import React from "react"
import TodoItem from "./todoItem"

var a = -1
var i = -1

function Todo() {

  // Set up Current Date

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date()
  const month = today.getMonth()
  const day = today.getDay()
  const fullDate = days[day] + ", " +  today.getDate() + " " + monthNames[month] + " " + today.getFullYear()

  //  Set up input feilds
  
  const [todoTitle, setTodoTitle] = React.useState("")
  const [tag, setTag] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")
  const [todoItems, setTodoItems] = React.useState([])
  const [valid, setValid] = React.useState(true)
  const [visibility, setvisibilty] = React.useState("invisible")
  const [showDate, setShowDate] = React.useState(false)

  //  Handle Function when text is inputted

  function handleTitle(event) {
    setTodoTitle(event.target.value)
  }
  function handleTag(event) {
    setTag(event.target.value)
    setvisibilty("visible")
  }
  function handleDate(event) {
    setDueDate(event.target.value)
    setvisibilty("visible")
  }

  function handleClick() {

    if (todoTitle !== "") {
      i++

      if (tag === "" && (dueDate === "" || dueDate === null)) {
        setvisibilty("invisible")
      } else {
        setvisibilty("visible")
      }
      console.log(visibility);

      setTodoItems(prevItems => {
        return [...prevItems, {
          itemTitle: todoTitle,
          itemTag: tag,
          itemDueDate: dueDate,
          visibility: visibility,
          itemID: i
        }]
      })
      setTodoTitle("")
      setTag("")
      setDueDate("")
      setValid(true)
      setvisibilty("invisible")
      setShowDate(true)
      
    } else {
      setValid(false)
    }
    
  }

  function deleteTask(id) {
    setTodoItems(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  
  return (
    <div className="todo">
      <h1> The Creative ToDo List </h1>

      <div className="todoInput">
        <input
          name="Item-Name"
          type="text"
          placeholder="What Do You Need to Do For Today?"
          onChange={handleTitle}
          value={todoTitle}
          autoComplete="off"
        />

        <select name="tags" onChange={handleTag} value={tag}>
          <option value="None">Select Tag</option>
          <option value="Important">Important</option>
          <option value="Urgent">Urgent</option>
          <option value="Office">Office</option>
          <option value="Work">Work</option>
          <option value="School">School</option>
          <option value="Home">Home</option>
          <option value="Other">Other</option>
        </select>

        <input
          className="date"
          type="text"
          placeholder="Set Due Date:"
          onChange={handleDate}
          value={dueDate}
        />

        <button onClick={handleClick}> Add </button>
        <h5 style={ valid ? {display: "none"} : {textAlign: "center", color: "red"}} >Please Enter the Title of the Task</h5>

      </div>

      <div style={ showDate ? {display: "block"} : {display: "none"} } className="listArea">
        <h3 style={{marginLeft: "20px"}}>{fullDate}</h3>
        {todoItems.map((item, index) => (
          <TodoItem
            taskTitle={item.itemTitle}
            tag={item.itemTag}
            date={item.itemDueDate}
            visibility={item.visibility}
            key={a++}
            id={index}
            onDelete={deleteTask}
          />
        ))}
      </div>

    </div>
  );
}

export default Todo;
