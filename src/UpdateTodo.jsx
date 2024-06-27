import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6';
import { useParams, useNavigate, Link } from 'react-router-dom'

const UpdateTodo = () => {
  const {id} = useParams(); 
  const [todoTitle, setTodoTitle] = useState(); 
  const [todoText, setTodoText] = useState(); 
  const [todoTime, setTodoTime] = useState(); 
  const navigate = useNavigate();
  
  let getHour = () => {
    let date = new Date(); 
    let n = date.toLocaleString([], {
      hour: '2-digit', 
      minute: '2-digit'
    })
    return n; 
  }

  // const handleUpdate = () => { 
  //   let time = getHour()
  //   setTodoTime(time)
  //   console.log(time); 
  //   console.log(todoTime); 
  //   axios.put("http://localhost:3001/updateTodo/"+id, {todoTitle, todoText, todoTime})
  //   .then(result => {
  //     console.log(result)
  //     navigate('/')
  //   })
  //   .catch(err => console.log(err)); 
  // }

  let handleDelete = () => {
    axios.delete('http://localhost:3001/deleteTodo/'+id)
    .then(res => {
      console.log(res)
      navigate('/')
    })
    .catch(err => console.log(err)); 
  }

  useEffect(() => {
    axios.get('http://localhost:3001/getTodo/'+id)
    .then(result => {
      console.log(result); 
      setTodoTitle(result.data.todoTitle)
      setTodoText(result.data.todoText)
      setTodoTime(result.data.todoTime)
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div className='min-h-screen w-full items-center justify-center bg-base-200 flex flex-col gap-4'>
      <div className='w-[60%] min-h-[5rem] bg-base-100 flex flex-col py-8 px-4 gap-4 rounded drop-shadow-lg'>
        <div className='flex w-full '>
          <h2 className=' font-medium mr-auto text-left'>{todoTitle}</h2>
          <h3 className=' font-medium'>{todoTime}</h3>
        </div>
        <div className='w-full join items-center'>
          <p className='text-left text-ellipsis join-item mr-auto'>{todoText}</p>
        </div>
          <button className='btn' onClick={() => {handleDelete()}}>Delete Todo</button>
      </div>
    </div>
  )
}

export default UpdateTodo
    