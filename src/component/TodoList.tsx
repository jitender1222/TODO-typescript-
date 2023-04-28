import React from 'react'
import { Todo } from './model';
import "./style.css";
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface props{
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    completeTodos:Todo[];
    setCompleteTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList= ({todos,setTodos,completeTodos,setCompleteTodos}:props) => {
  return (
   <div className="container">
    <Droppable droppableId='TodosList'>
      {
        (provided,snapshot)=>(
          <div className={`todos todos--full ${snapshot.isDraggingOver?"dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
      <span className='todos__heading'>
        Active Tasks
      </span>
      {
        todos?.map((todo,index)=>(
          <SingleTodo 
          index={index}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          key={todo.id}
          />
        ))
      }
      {provided.placeholder}
    </div>
        )
      }
      </Droppable>
      <Droppable droppableId='TodoRemove'>
        {
          (provided,snapshot)=>(
            <div className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className='todos__heading'>
              Completed Tasks
            </span>
            {
              completeTodos.map((todo,index)=>(
                <SingleTodo
                index={index} 
                todo={todo}
                todos={completeTodos}
                setTodos={setCompleteTodos}
                key={todo.id}
                />
              ))
            }
            {provided.placeholder}
          </div>
          )
        }   
    </Droppable>
    </div>
  )
}

export default TodoList