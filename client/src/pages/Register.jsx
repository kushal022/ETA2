import React, { useEffect, useState } from 'react'
import {Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader';
import axios from 'axios'


const Register = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false)


  //handlerSubmit:
  const handlerSubmit = async(values)=>{
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:3500/api/v1/user/register',
        values,
      )
      setLoading(false)
      // console.log(res)
      message.success(res.data.message)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      console.log(error)
      message.success(error.response.data.message)
    }
  }

  //Prevent for login user:
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[navigate])


  return (
    <>
        <div className="register-page vh-100 d-flex justify-content-center align-items-center h">
            {Loading ? <Loader/> : 
            <Form layout='vertical' onFinish={handlerSubmit} className='w-25'>
              <h1>Register</h1>
              <Form.Item label="Name" name="username">
                <Input type='text'/>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type='email'/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type='password'/>
              </Form.Item>
              <div className="d-flex flex-column gap-2 align-items-center">
                <button className='btn btn-primary px-5'>Register</button>
                <Link to="/login" >Already Registered ? Login</Link>
              </div>
            </Form>}
        </div>
    </>
  )
}

export default Register