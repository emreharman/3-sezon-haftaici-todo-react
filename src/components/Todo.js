import React from "react";

const Todo = (props) => {
  const { todo, yapilacaklarListesi,setYapilacaklarListesi } = props;
  

  const tarih = new Date(todo.createdAt);

  const handleDelete=()=>{
    const geciciDizi = yapilacaklarListesi.filter(item => item.id !== todo.id)
    setYapilacaklarListesi(geciciDizi)
  }
  const handleDoneBtn = ()=>{
    const newTodo={
        ...todo,
        isDone: !todo.isDone,
    }
    const cikarilmisDizi = yapilacaklarListesi.filter(item => item.id !== todo.id)
    const yeniDizi = [...cikarilmisDizi, newTodo]
    setYapilacaklarListesi(yeniDizi)
    
  }

  return (
    <div
      className={`d-flex align-items-center justify-content-between alert alert-${
        todo.isDone === false ? "secondary" : "success"
      }`}>
      <div>
        <h1 className={`${todo.isDone === true ? "text-decoration-line-through":""}`}>{todo.text}</h1>
        <small>{tarih.toLocaleString()}</small>
      </div>
      <div>
        <div className="btn-group">
          <button onClick={handleDoneBtn} type="button" className="btn btn-sm btn-success">
            {todo.isDone === false ? "Done" : "Undone"}
          </button>
          <button type="button" className="btn btn-sm btn-secondary">
            Edit
          </button>
          <button onClick={handleDelete} type="button" className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
