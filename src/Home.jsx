import React, { useEffect, useState } from 'react'
import { FaPencil, } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState(); 
  const [todoText, setTodoText] = useState(); 
  const [todoTime, setTodoTime] = useState(); 

    let getHour = () => {
      let date = new Date(); 
      let n = date.toLocaleString([], {
        hour: '2-digit', 
        minute: '2-digit'
      })
      setTodoTime(); 
    }

    setTimeout(() => {
      getHour()
    }, 60000)

    let postTodo = () => {
      axios.post("http://localhost:3001/createTodo", {todoTitle, todoText, todoTime})
      .then(result => {
        console.log(result); 
      })
      setTodoTitle(''); 
      setTodoText(''); 
    }

    let handleDelete = (id) => {
      axios.delete('http://localhost:3001/deleteTodo/'+id)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err)); 
    }

    useEffect(() => {
      axios.get('http://localhost:3001')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
    }, [setTimeout(() => {

    }, 1000)])
    
  return (
    <div className='bg-white min-h-screen w-full p-4  flex items-center justify-center'>
        <div className='h-[55rem] w-[60%] overflow-y-scroll bg-base-200 drop-shadow-lg gap-6 flex flex-col items-center p-4'>
          <h2 className='text-xl'>2Due </h2>
          <div className='join input-cont w-full bg-base-100 p-4 rounded drop-shadow-md flex flex-col'>
            <input className='join-item input input-bordered w-full rounded' placeholder='Title: Grocery List, Study, etc' maxLength='15' type='text' value={todoTitle} onChange={(e) => {setTodoTitle(e.target.value)}} />
            <div className='join w-full'>
              <input className='join-item input input-bordered w-full' placeholder='Body: Bananas, Tomatoes, Milk, etc' type='text' value={todoText} onChange={(e) => {setTodoText(e.target.value)}}/>
              <button className='join-item btn btn-outline' onClick={() => {
                postTodo(); 
              }}>Add</button>
            </div>
          </div>
          <div className='todo-cont w-full flex flex-col gap-2'>
            {//this will hold todos
              todos.map((todo) => {
                return <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: .45, delay: .4}} className='w-full bg-base-100 min-h-[5rem] flex flex-col items-center p-4 drop-shadow-lg rounded'>
                        <div className='flex w-full '>
                          <h2 className=' font-medium mr-auto text-left'>{todo.todoTitle}</h2>
                          <h3 className=' font-medium'>{todo.todoTime}</h3>
                        </div>
                        <div className='w-full join items-center'>
                          <p className='text-left text-ellipsis join-item mr-auto'>{todo.todoText}</p>
                          <button className='btn' onClick={() => {handleDelete(todo._id)}}><FaRegTrashCan/></button>
                        </div>
                      </motion.div>
              })
            }
          </div>

        </div>
    </div>
  )
}

export default Home
