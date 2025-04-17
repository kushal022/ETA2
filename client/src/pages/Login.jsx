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
      localStorage.setItem('id',res.data.id)
      localStorage.setItem('username',res.data.username)
      localStorage.setItem('email',res.data.email)
      localStorage.setItem('token',res.data.token)
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
      if(localStorage.getItem('username')){
        navigate('/')
      }
    },[navigate])

  return (
    <>
        <div className="register-page vh-100 d-flex justify-content-center align-items-center h">
            {Loading && <Loader/>}
            <Form layout='vertical' onFinish={handlerSubmit} className='w-25'>
              <h1>Login</h1>
              <Form.Item label="Email" name="email">
                <Input type='email'/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type='password'/>
              </Form.Item>
              <div className="d-flex flex-column gap-2 align-items-center">
                <button className='btn btn-primary px-5'>Login</button>
                <Link to="/register" >Not a user ? Register</Link>
              </div>
            </Form>
        </div>
    </>
  )
}

export default Login