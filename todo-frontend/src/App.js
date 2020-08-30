import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./components/Task";
import Loader from "./components/Loader";
import API from "./API";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    API.getAllTodos().then((res) => {
      setTodos(res);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="inputs">
          <div className="container-task">
            <input
              onChange={(e) => {
                setTask(e.target.value);
              }}
              value={task}
              type="text"
              className="input-task"
              placeholder="Type in your task"
            />
          </div>
          <div className="container-date-submit">
            <div className="container-date">
              <input
                type="date"
                className="input-date"
                value={date}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="container-submit">
              <button
                className={loading ? "input-submit active" : "input-submit"}
                onClick={(e) => {
                  setLoading(true);
                  API.createTodo(task, date)
                    .then(() => {
                      getTodos();
                      setLoading(false);
                    })
                    .catch((err) => {
                      alert("error");
                      setLoading(false);
                    });
                }}
              >
                {loading ? <Loader /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
        <div className="container-tasks">
          <p className="count">{`${todos.length} Tasks`}</p>
          {todos.map(({ date, task, completed, _id }) => (
            <Task
              date={date}
              task={task}
              completed={completed}
              _id={_id}
              deleteTodo={API.deleteTodo}
              getTodos={getTodos}
              updateTodo={API.updateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
