import React, { useEffect, useState } from "react";
import axios from "axios";
import "./components/Todo.css";
import TodoList from "./components/TodoList";
import { getAuthToken, removeAuthToken } from '../../utils/Auth';
import { GET_API_TODOS, CREATE_API_TODOS, DEL_API_TODOS, UPDATE_API_TODOS } from '../../Api/Api';

const Todo = () => {
  const pageName = "TodoList";
  const [enteredText, setEnteredText] = useState("");
  const [currentTodo, setCurrentTodo] = useState([]);
  const authToken = getAuthToken();
  useEffect(() => {
    document.title = pageName;
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {

      const response = await axios.get(GET_API_TODOS, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setCurrentTodo(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!enteredText) {
      return alert("Please enter some text.");
    }

    try {
      const newTodo = { task: enteredText };
      const response = await axios.post(CREATE_API_TODOS, newTodo, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setCurrentTodo([...currentTodo, response.data]); // Update state with new todo
      setEnteredText("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const todoDelHandler = async (id) => {
    try {
      await axios.delete(`${DEL_API_TODOS}/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const updatedTodo = currentTodo.filter((todo) => todo._id !== id);
      setCurrentTodo(updatedTodo); // Update state after deleting todo
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="conatiner-fluid text-center">
      <h2>{pageName}</h2>
      <div className="addTodoForm">
        <div className="row">
          <div className="col-10">
            <input
              value={enteredText}
              onChange={(event) => setEnteredText(event.target.value)}
              type="text"
              className="form-control"
              placeholder="Write todo"
            />
          </div>
          <div className="col-2">
            <i className="btn btn-primary" onClick={addTodo}>
              Create
            </i>
          </div>
        </div>
      </div>
      <TodoList passTodo={currentTodo} onDel={todoDelHandler} />
    </div>
  );
};

export default Todo;