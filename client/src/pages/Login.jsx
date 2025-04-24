import React, { useEffect, useState } from 'react'
import {Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader';
import axios from 'axios'


const Login = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false)

  //handlerSubmit:
  const handlerSubmit = async(values)=>{
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:3500/api/v1/user/login',
        values,
      )
      setLoading(false)
      console.log(res)
      // localStorage.setItem('id',res.data.id)
      // localStorage.setItem('username',res.data.username)
      // localStorage.setItem('email',res.data.email)
      // localStorage.setItem('token',res.data.token)
      localStorage.setItem('user',JSON.stringify(res.data))
      message.success(res.data.message)
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.log(error)
      message.success(error.response.data.message)
      
    }
  }

  //Prevent for login user if logged in:
    useEffect(()=>{
      if(localStorage.getItem('user')){
        navigate('/')
      }
    },[navigate])

  return (
    <>
        <div className="register-page vh-100 d-flex flex-column justify-content-center align-items-center">
            {Loading ? <Loader/>:<>
              <h2 className='fs-1 fw-bold mb-3'>Expense Tracker System - MERN</h2>
            <div className="card w-75 h-75 shadow-lg d-flex flex-column flex-md-row gap-4 bg-body-secondary">
              <div>
                <img className='h-100 w-100 img-fluid ' src="https://static.vecteezy.com/system/resources/previews/000/545/109/original/expense-word-lettering-illustration-vector.jpg" alt="" />
              </div>
            <Form layout='vertical' onFinish={handlerSubmit} className='w-md-25 align-self-center  '>
              <h1 className='card-title text-center py-1 fw-bold'>Login</h1>
              <Form.Item label="Email" name="email">
                <Input type='email'/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type='password'/>
              </Form.Item>
              <div className="d-flex gap-4 align-items-center ">
                <Link to="/register" >Not a user ? Register</Link>
                <button className='btn btn-secondary px-5'>Login</button>
              </div>
            </Form>
        </div></>}
        </div>
    </>
  )
}

export default Login