import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";

function App() {
  const [todoText, setTodoText] = useState("");
  const [yapilacaklarListesi, setYapilacaklarListesi] = useState([]);
  
  useEffect(()=>{
    const fromLocalStorage=localStorage.getItem("yapilacaklarListesi")
    console.log("fromLocalStorage",fromLocalStorage)
    if(fromLocalStorage === null){
      localStorage.setItem("yapilacaklarListesi",JSON.stringify([]))
    }else{
      setYapilacaklarListesi(JSON.parse(fromLocalStorage))
    }
    //localStorage.setItem("yapilacaklarListesi",yapilacaklarListesi)
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo text can't be empty!");
      return;
    }
    const todo = {
      id: new Date().getTime(),
      text: todoText,
      isDone: false,
      createdAt: new Date(),
    };
    setYapilacaklarListesi([...yapilacaklarListesi, todo]);
    localStorage.setItem("yapilacaklarListesi",JSON.stringify([...yapilacaklarListesi, todo]))
    setTodoText("");
  };
  return (
    <div className="container p-5">
      <h1 className="text-center my-3">My Todo List</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your todo..."
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
      <div>
        {yapilacaklarListesi.length !== 0 ? (
          <div>
            {yapilacaklarListesi.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                yapilacaklarListesi={yapilacaklarListesi}
                setYapilacaklarListesi={setYapilacaklarListesi}
              />
            ))}
          </div>
        ) : (
          <p className="text-center my-5">You don't have any todos yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
