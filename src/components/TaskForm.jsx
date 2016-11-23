import React from 'react';

function TaskForm(props) {
  return (
    <div className="form-group">
      <input id={props.id} type="text" value={props.value} onChange={props.handleChange} name="task" placeholder="Task Name"/>
    </div>
  )
}

export default TaskForm