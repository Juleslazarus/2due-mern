import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import '../tailwind.css'
import Home from './Home'
import UpdateTodo from './UpdateTodo'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/update/:id' element={<UpdateTodo/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
