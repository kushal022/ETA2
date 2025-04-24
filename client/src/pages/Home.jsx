import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Button, Form, Input, message, Modal, Select, Table, DatePicker } from 'antd'
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import axios from 'axios'
const {RangePicker} = DatePicker;
import moment from 'moment';
import Chart from '../components/Chart'

const Home = () => {
  const [IsModalOpen,setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [AllTransactions, setAllTransactions] = useState([])
  const [Freq, setFreq] = useState('7')
  const [selectDate, setSelectDate] = useState([])
  const [type, setType] = useState('all')
  const [ViewData, setViewData] = useState('table')
  const [Edit, setEdit] = useState(null)

  //todo: Form Submit: Add transaction 
  const handleSubmitForm = async (values)=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(Edit){
        const res = await axios.put('/api/v1/transaction/editTransaction',
          {
            payload: {...values, userId: user.id},
            transactionId: Edit._id
          });
        message.success(res.data.message)
        setLoading(false)
      }else{
        const res = await axios.post('/api/v1/transaction/addTransaction',
          {...values, userId: user.id}
        );
        message.success(res.data.message)
        setLoading(false)
      }
      // console.log(res.data)
      setIsModalOpen(false)
      setEdit(null)
    } catch (error) {
      console.log(error)
      message.error(error.response.data.message)
    }
  }

  //todo___ Delete transaction:
  const handleDeleteTransaction = async(record)=>{
    try {
      setLoading(true)
      const res = await axios.post('/api/v1/transaction/deleteTransaction',
        {transactionId: record._id}
      )
      message.success(res.data.message)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  //todo: Get all transactions:
  useEffect(()=>{
    const handlerGetAllTransaction =async()=>{
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post('/api/v1/transaction/getAllTransaction',
          {userId: user.id,Freq,selectDate,type}
        )
        // console.log(res.data)
        setAllTransactions(res.data)
      } catch (error) {
        console.log(error)
        // message.error(error.response.message)
      }
    }
    handlerGetAllTransaction()
  },[Freq,selectDate,type])

  //Table Data:
  const columns = [
    {
      title:'Date',
      dataIndex:'date',
      key:'date',
      render: (text)=> <span>{moment(text).format('YYYY-MM-DD')}</span>
    },{
      title:'Amount',
      dataIndex:'amount',
      key:'amount',
      render:(text,record)=>(
        <div className = {`${record.type ==='income'?'text-success':'text-danger'} d-flex align-items-center`}>
          {record.amount}
        </div>
      )
    },{
      title:'Type',
      dataIndex:'type',
      key:'type',
      render:(text,record)=>(
          <div className = {`${record.type ==='income'?'text-success':'text-danger'} d-flex text-capitalize  align-items-center`}>
            {record.type}
          </div>
      )
    },{
      title:'Category',
      dataIndex:'category',
      key:'category',
    },{
      title:'Reference',
      dataIndex:'reference',
      key:'reference',
    },{
      title:'Description',
      dataIndex:'description',
      key:'description',
    },{
      title:'Actions',
      key:'actions',
      render: (text,record) =>(
        <div className='d-flex gap-5'>
          <EditOutlined onClick={()=>{
              setEdit(record)
              setIsModalOpen(true)
            }} 
            className='btn btn-primary' 
          />
          
          <DeleteOutlined 
            onClick={()=>handleDeleteTransaction(record)} 
            className='btn btn-danger'/>
        </div>
      )
    }
  ]

  return (
    <Layout className='vh-100'>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        <div className=" card w-75 my-3 ">
        <div className="filters d-flex flex-wrap gap-3 align-items-center justify-content-between py-3 px-4 shadow ">
            <div className='w-25'>
              <h6>Select Frequency</h6>
              <Select value={Freq} onChange={(value)=>setFreq(value)} className='w-100'>
                <Select.Option value='7'>Last 1 Week</Select.Option>
                <Select.Option value='30'>Last 1 Month</Select.Option>
                <Select.Option value='365'>Last 1 Year</Select.Option>
                <Select.Option value='custom'>Custom</Select.Option>
              </Select>
              {Freq === 'custom' &&
                <RangePicker 
                  value={selectDate} 
                  onChange={(value)=>setSelectDate(value)}
                />
              }
            </div>
            <div className='w-25'>
              <h6 className=''>Select Type</h6>
              <Select value={type} onChange={(value)=>setType(value)} className='w-100'>
                <Select.Option value='all'>ALL</Select.Option>
                <Select.Option value='income'>INCOME</Select.Option>
                <Select.Option value='expense'>EXPENSE</Select.Option>
              </Select>
              {Freq === 'custom' &&
                <RangePicker 
                  value={selectDate} 
                  onChange={(value)=>setSelectDate(value)}
                />
              }
            </div>
            <div className='mx-2 p-2 shadow-sm border border border-1 rounded-1'>
                <UnorderedListOutlined onClick={()=>setViewData('table')}  
                    className={`mx-2 fs-5  ${ViewData==='table'? 'text-primary': 'text-secondary'}`}/>
                <AreaChartOutlined onClick={()=>setViewData('chart')} 
                    className={`mx-2 fs-5  ${ViewData!=='table'? 'text-primary': 'text-secondary'}`}/> 
            </div>
            <div>
              <button onClick={()=>{
                // setEdit(null)  
                setIsModalOpen(true)}
              }
               className='btn btn-primary'>
                Add New
              </button>
            </div>
          </div>
        </div>
        <div className="content w-75">
            <div className=" card card-body  mb-4">
            { loading && 
              ViewData==='table'?
              <Table
                scroll={{ x: 'max-content' }}
                columns={columns}
                className=''
                dataSource={AllTransactions}/>
              :
              <Chart allTransactions={AllTransactions}/>
            }
            </div>
        </div>
      </div>
      <Modal 
        title={Edit ? 'Edit Transaction' : 'Add Transaction'} 
        open={IsModalOpen} 
        footer={false}
        // onOk={handlerOk}
        onCancel={()=>{
          setIsModalOpen(false)
          // setEdit(null)
        }
        }>
          <Form 
            layout='vertical'
            onFinish={handleSubmitForm}
            initialValues={Edit}
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
                <Select.Option value='salary'>Salary</Select.Option>
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