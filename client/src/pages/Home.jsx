import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { Button, Form, Input, Modal, Select } from 'antd'

const Home = () => {
  const [IsModalOpen,setIsModalOpen] = useState(false)

  //Form Submit
  const handleSubmitForm = (values)=>{
    console.log(values)
  }

  //
  return (
    <Layout>
      <div className="filters d-flex align-items-center justify-content-between py-3 px-4 shadow ">
        <div>Range Filters</div>
        <div>
          <button onClick={()=>setIsModalOpen(true)}
           className='btn btn-primary'>Add New</button>
        </div>
      </div>
      <div className="content"></div>
      <Modal 
        title='Add Transaction' 
        open={IsModalOpen} 
        footer={false}
        // onOk={handlerOk}
        onCancel={()=>setIsModalOpen(false)
        }>
          <Form 
            layout='vertical'
            onFinish={handleSubmitForm}
          >
            <Form.Item label='Amount' name='amount'>
              <Input type='text'/>
            </Form.Item>
            <Form.Item label='Type' name='type'>
              <Select>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Category' name='category'>
              <Select>
                <Select.Option value='tip'>Tip</Select.Option>
                <Select.Option value='project'>Project</Select.Option>
                <Select.Option value='food'>Food</Select.Option>
                <Select.Option value='movie'>Movie</Select.Option>
                <Select.Option value='bills'>Bills</Select.Option>
                <Select.Option value='medical'>Medical</Select.Option>
                <Select.Option value='fee'>Fee</Select.Option>
                <Select.Option value='tax'>Tax</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Date' name='date'>
              <Input type='date'/>
            </Form.Item>
            <Form.Item label='Reference' name='reference'>
              <Input type='text'/>
            </Form.Item>
            <Form.Item label='Description' name='description'>
              <Input type='text'/>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type='submit' className='btn btn-primary' >SAVE</button>
            </div>
          </Form>

      </Modal>
    </Layout>
  )
}

export default Home