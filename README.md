refer: https://www.youtube.com/watch?v=kK_Wqx3RnHk&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=6&ab_channel=WebDevSimplified

- for state management.

# start up code

- click button for increment & decrement (src/App.js)

```

import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(prevCount => prevCount +1)
  }
  function decrement() {
    setCount(prevCount => prevCount-1)
  }
  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </>
  )
}

```
![start](https://trello-attachments.s3.amazonaws.com/5cef6e87da0d0b7598cbc7a9/6050502e1d89694169d2e48a/81d98c1b2ca40cf2dce058b63ca6d4c6/image.png)

- apply useReducer (src/App.js):

```

import React, { useReducer } from 'react'

const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { count: state.count + 1}
    case ACTION.DECREMENT:
      return { count: state.count - 1}
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {count: 0}) // func,object

  function increment() {
    dispatch({ type: ACTION.INCREMENT })
  }
  function decrement() {
    dispatch({ type: ACTION.DECREMENT })
  }
  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </>
  )
}

```

**Result: same as before but now we use useReducer instead of useState, this is useful when useState is complex **
# other example  💫

- src/App.js

```

import React, { useReducer, useState } from 'react'
import Todo from './Todo.js'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

function reducer(todos, action) {
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
    e.preventDefault()
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

```

- src/Todo.js

```

import React from 'react'
import { ACTIONS } from './App'

export default function Todo({ todo, dispatch }) {
  return (
    <div>
      <span style={{ color: todo.complete ? '#AAA' : '#000'}}>
        {todo.name}
      </span>
      <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id }})}>Toggle</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id }})}>Delete</button>
    </div>
  )
}

```

**result: when click toggle the text gray out click again text went back the color, when click delete, delete the view element**
![final](https://trello-attachments.s3.amazonaws.com/5cef6e87da0d0b7598cbc7a9/6050502e1d89694169d2e48a/87f4922941d84532de56b9e66ee20c40/image.png)

**NOTE: in normal useState case we need to passing in handleDelete, handleTodo, ...ect, but with useReducer we only passing in dispatch.**