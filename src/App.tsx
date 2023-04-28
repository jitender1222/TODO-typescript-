import React, { useState } from 'react';
import './App.css';
import InputField from './component/InputField';
import { Todo } from './component/model';
import TodoList from './component/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const  App:React.FC =()=> {
  const [todo,setTodo]=useState<string>("");
  const [todos,setTodos]=useState<Todo[]>([]);
  const [completeTodos,setCompleteTodos]=useState<Todo[]>([]);

  const handleAdd=(e:React.FormEvent)=>{
    e.preventDefault();

    if(todo){
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}]);
      setTodo("");
    }
    console.log(todos);
  };

    const onDragEnd=(result:DropResult)=>{

      const {destination,source}=result;

      if(!destination) {return;}

      if(destination.droppableId=== source.droppableId && destination.index===source.index){
      return ;
      }
      let add;
      let active = todos;
      let complete = completeTodos;
      // Source Logic
      if (source.droppableId === "TodosList") {
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
  
      // Destination Logic
      if (destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }
  
      setCompleteTodos(complete);
      setTodos(active);
    } 
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completeTodos={completeTodos}
        setCompleteTodos={setCompleteTodos}
      />
    </div>
  </DragDropContext>
);
};

export default App;
