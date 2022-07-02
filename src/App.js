import "./style.css";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const inputref = useRef();
  const [display, setDisplay] = useState([false]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggletodo(id) {
    const newTodos = [...todos];
    const todoxd = newTodos.find((todo) => todo.id === id);
    todoxd.complete = !todoxd.complete;
    setTodos(newTodos);
  }
  function Addtodo() {
    const currentinput = inputref.current.value;
    if (currentinput === "") return null;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), name: currentinput, complete: false }
    ]);

    inputref.current.value = "";
  }

  function Functionenter(e) {
    if (e.key === "Enter") Addtodo();
  }
  function RemoveCompleted() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  function RemoveAll() {
    const newTodos = [];
    setTodos(newTodos);
  }
  
  return (
    <div className="App">
      <div>
        {display
          ? todos.map((todo,index) => (
              <ul className="tasks">
                <li key={index} onClick={() => toggletodo(todo.id)}>{todo.name}</li>
                <input type="checkbox" onChange={() => toggletodo(todo.id)} checked={todo.complete}/>
              </ul>
            ))
          : null}
      </div>

      <input ref={inputref}type="text"placeholder="Add to do"onKeyDown={(e) => Functionenter(e)}
      />
      <button onClick={() => Addtodo()}>Add to do</button>
      <button onClick={() => RemoveCompleted()}>Remove completed to do</button>
      <button onClick={() => RemoveAll()}>Remove all to do</button>
      <button onClick={() => setDisplay(!display)}> {display ? "Hide To do" : "Show to do"}</button>
    </div>
  );
}

export default App;
