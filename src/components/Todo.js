import React, { useState } from "react";

const Todo = (props) => {
  const { todo, yapilacaklarListesi, setYapilacaklarListesi } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const tarih = new Date(todo.createdAt);

  const handleDelete = () => {
    const geciciDizi = yapilacaklarListesi.filter(
      (item) => item.id !== todo.id
    );
    setYapilacaklarListesi(geciciDizi);
    localStorage.setItem("yapilacaklarListesi",JSON.stringify(geciciDizi))
  };
  const handleDoneBtn = () => {
    const newTodo = {
      ...todo,
      isDone: !todo.isDone,
    };
    const cikarilmisDizi = yapilacaklarListesi.filter(
      (item) => item.id !== todo.id
    );
    const yeniDizi = [...cikarilmisDizi, newTodo];
    setYapilacaklarListesi(yeniDizi);
  };
  const handleEdit=()=>{
    const newTodo={
      ...todo,
      text: updatedText,
    }
    const updatedArray=[]
    for(let i=0;i<yapilacaklarListesi.length;i++){
      if(newTodo.id === yapilacaklarListesi[i].id){
        updatedArray.push(newTodo)
      }else{
        updatedArray.push(yapilacaklarListesi[i])
      }
    }
    setYapilacaklarListesi(updatedArray)
    /* const cikarilmisDizi=yapilacaklarListesi.filter(item=>item.id !== todo.id)
    setYapilacaklarListesi([...cikarilmisDizi,newTodo]) */
    setIsEdit(false)
  }

  return (
    <div
      className={`d-flex align-items-center justify-content-between alert alert-${
        todo.isDone === false ? "secondary" : "success"
      }`}>
      <div>
        {isEdit === false ? (
          <h1
            className={`${
              todo.isDone === true ? "text-decoration-line-through" : ""
            }`}>
            {todo.text}
          </h1>
        ) : (
          <div className="d-flex">
            <input
              value={updatedText}
              onChange={(event) => setUpdatedText(event.target.value)}
            />
            <button onClick={handleEdit} className="btn btn-sm btn-outline-primary">Save</button>
          </div>
        )}

        <small>{tarih.toLocaleString()}</small>
      </div>
      <div>
        <div className="btn-group">
          <button
            onClick={handleDoneBtn}
            type="button"
            className="btn btn-sm btn-success">
            {todo.isDone === false ? "Done" : "Undone"}
          </button>
          <button
            onClick={() => {
              setIsEdit(!isEdit);
              if (isEdit === true) {
                setUpdatedText(todo.text);
              }
            }}
            type="button"
            className="btn btn-sm btn-secondary">
            {isEdit === false ? "Edit" : "Cancel"}
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
