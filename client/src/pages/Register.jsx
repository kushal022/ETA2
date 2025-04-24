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
      const res = await axios.post('/api/v1/user/register',
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
        <div className="register-page vh-100 w-100 d-flex justify-content-center align-items-center">
            {Loading ? <Loader/> : 
            <div className="card bg-body-secondary shadow-lg w-md-75 h-md-75 d-flex flex-sm-column flex-md-row justify-content-center align-items-center">
              <div className='h-100 w-md-75'>
                <img className='w-100 h-100 img-fluid' src="https://www.65ymas.com/uploads/s1/45/10/00/dinero_1_621x621.jpeg" alt="" />
              </div>
            <Form layout='vertical' onFinish={handlerSubmit} className='w-50 px-md-5 py-4'>
              <h1 className='card-title text-center py-1 fw-bold'>Register</h1>
              <Form.Item label="Name" name="username">
                <Input type='text' required/>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type='email' required/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type='password' required/>
              </Form.Item>
              <div className="d-flex flex-column gap-2 align-items-center">
                <button className='btn btn-secondary px-5'>Register</button>
                <Link to="/login" >Already Registered ? Login</Link>
              </div>
            </Form>
            </div>}
        </div>
    </>
  )
}

export default Register