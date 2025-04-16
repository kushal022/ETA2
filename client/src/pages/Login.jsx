import React from 'react'
import {Form, Input} from 'antd'
import {Link} from 'react-router-dom'


const Login = () => {

  //handlerSubmit:
  const handlerSubmit = (values)=>{
    console.log(values)
  }
  return (
    <>
        <div className="register-page vh-100 d-flex justify-content-center align-items-center h">
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