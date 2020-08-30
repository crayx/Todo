import React, { useState } from "react";
import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheck,
  faTimes,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const giveTense = (date) => {
  const today = new Date(Date.now()).setHours(0, 0, 0, 0);
  const day = new Date(Date.parse(date)).setHours(0, 0, 0, 0);
  if (day == today) return 2;
  else if (day > today) return 3;
  else return 1;
};

const Task = ({
  date,
  task,
  completed,
  deleteTodo,
  _id,
  getTodos,
  updateTodo,
}) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [edit, setEdit] = useState(false);
  const dateTense = giveTense(date);
  return (
    <div className="task">
      {dateTense === 1 && !completed && <div className="status red"></div>}
      {dateTense === 2 && !completed && <div className="status blue"></div>}
      {dateTense === 3 && !completed && <div className="status yellow"></div>}
      {completed && <div className="status grey"></div>}
      <div className="content-task">
        {!edit && (
          <div className={completed ? "title-complete" : "title"}>{task}</div>
        )}
        {edit && (
          <div className="container-edit">
            <input
              className="input-edit"
              value={updatedTask}
              onChange={(e) => {
                setUpdatedTask(e.target.value);
              }}
              type="text"
            />
            <FontAwesomeIcon
              className="action"
              icon={faSave}
              onClick={() => {
                updateTodo(_id, { task: updatedTask }).then(() => {
                  getTodos();
                  setEdit(false);
                });
              }}
            />
          </div>
        )}
        <div className="date">
          {dateTense === 1
            ? date
              ? `Deadline was on ${new Date(Date.parse(date)).toDateString()}`
              : "No deadline mentioned"
            : ""}
          {dateTense === 2 ? `Complete it today` : ""}
          {dateTense === 3
            ? `Complete it by ${new Date(Date.parse(date)).toDateString()}`
            : ""}
        </div>
      </div>
      <div className="actions">
        {!completed && (
          <FontAwesomeIcon
            className="action"
            icon={faCheck}
            onClick={() => {
              updateTodo(_id, { completed: true }).then(() => {
                getTodos();
              });
            }}
          />
        )}
        {completed && (
          <FontAwesomeIcon
            className="action"
            icon={faTimes}
            onClick={() => {
              updateTodo(_id, { completed: false }).then(() => {
                getTodos();
              });
            }}
          />
        )}
        {!edit && (
          <FontAwesomeIcon
            className="action"
            icon={faEdit}
            onClick={() => {
              setEdit(true);
            }}
          />
        )}
        {edit && (
          <FontAwesomeIcon
            className="action"
            icon={faEdit}
            onClick={() => {
              setEdit(false);
            }}
          />
        )}
        <FontAwesomeIcon
          className="action"
          icon={faTrash}
          onClick={() => {
            deleteTodo(_id).then(() => {
              getTodos();
            });
          }}
        />
      </div>
    </div>
  );
};

export default Task;
