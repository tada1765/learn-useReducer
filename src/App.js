/* start up code */
// import React, { useState } from 'react'

// export default function App() {
//   const [count, setCount] = useState(0)

//   function increment() {
//     setCount(prevCount => prevCount +1)
//   }
//   function decrement() {
//     setCount(prevCount => prevCount-1)
//   }
//   return (
//     <>
//       <button onClick={decrement}>-</button>
//       <span>{count}</span>
//       <button onClick={increment}>+</button>
//     </>
//   )
// }

/* apply useReducer to start up code 🎬*/
// import React, { useReducer } from 'react'

// const ACTION = {
//   INCREMENT: 'increment',
//   DECREMENT: 'decrement'
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case ACTION.INCREMENT:
//       return { count: state.count + 1}
//     case ACTION.DECREMENT:
//       return { count: state.count - 1}
//     default:
//       return state
//   }
// }

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, {count: 0}) // func,object

//   function increment() {
//     dispatch({ type: ACTION.INCREMENT })
//   }
//   function decrement() {
//     dispatch({ type: ACTION.DECREMENT })
//   }
//   return (
//     <>
//       <button onClick={decrement}>-</button>
//       <span>{state.count}</span>
//       <button onClick={increment}>+</button>
//     </>
//   )
// }

/* Other complex example 💫  */
import React, { useReducer, useState } from 'react'
import Todo from './Todo.js'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

function reducer(todos, action) {
  // console.log(action)
  // console.log(todos)
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete}
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false}
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('')
  
  function handleSubmit(e) {
    e.preventDefault() // prevent page refresh 
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
    setName('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </form>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      })}
    </>
  )
} 