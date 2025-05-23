import { Progress } from 'antd';
import { all } from 'axios';
import React from 'react'

const Chart = ({allTransactions}) => {
    //Total Transaction
    const totalTransaction = allTransactions.length;
    const totalIncomeTransaction = allTransactions.filter(transaction=> transaction.type === 'income')
    const totalExpenseTransaction = allTransactions.filter(transaction=> transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransaction.length/totalTransaction)*100;
    const totalExpensePercent = (totalExpenseTransaction.length/totalTransaction)*100;

    //Total Turnover:
    const totalTurnover = allTransactions.reduce((accumulator, transaction)=> accumulator + transaction.amount,0)
    const totalIncomeTurnover = allTransactions.filter(transaction=> transaction.type === 'income').reduce((acc, transaction)=> acc + transaction.amount,0)
    const totalExpenseTurnover = allTransactions.filter(transaction=> transaction.type === 'expense').reduce((acc, transaction)=> acc + transaction.amount,0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalTurnover)*100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover/totalTurnover)*100;

    //Category:

    const categories = [
        'salary',
        'tip',
        'project',
        'food',
        'movie',
        'bills',
        'medical',
        'fee',
        'tax',
    ]

    return (
    <>  
        {/* ----------- Transactions --------------------- */}
        <div className="row m-3">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header">
                        Total Transaction : {totalTransaction} 
                    </div>
                    <div className="card-body d-flex flex-column align-items-center">
                        <h5 className='text-success'>Income : {totalIncomeTransaction.length}</h5>
                        <h5 className='text-danger'>Expense : {totalExpenseTransaction.length}</h5>
                        <div className='d-flex flex-column'>
                            <Progress 
                                type='circle' 
                                strokeColor={'green'}
                                percent={totalIncomePercent.toFixed(0)} 
                                className='m-2' 
                            />
                            <Progress 
                                type='circle' 
                                strokeColor={'red'}
                                percent={totalExpensePercent.toFixed(0)} 
                                className='m-2' 
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------------------------- */}
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header">
                        Total Turnover : {totalTurnover} 
                    </div>
                    <div className="card-body d-flex flex-column align-items-center">
                        <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                        <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                        <div  className='d-flex flex-column'>
                            <Progress 
                                type='circle' 
                                strokeColor={'green'}
                                percent={totalIncomeTurnoverPercent.toFixed(0)} 
                                className='m-2' 
                            />
                            <Progress 
                                type='circle' 
                                strokeColor={'red'}
                                percent={totalExpenseTurnoverPercent.toFixed(0)} 
                                className='m-2' 
                            />
                        </div>
                    </div>
                </div>
            </div>
        {/* </div> */}
        {/* ----------- Transactions Category wise --------------------- */}
        {/* <div className="row m-3"> */}
            <div className="col-md-3">
                <h4 className='card-header'>Categorywise Income</h4>
                {
                    categories.map((cat,i) => {
                        const amount = allTransactions
                            .filter(transaction => transaction.type === 'income' && transaction.category === cat)
                            .reduce((acc,transaction)=> acc + transaction.amount, 0);
                        return (
                            amount > 0 && (
                            <div className="card mt-3" key={i}>
                                <div className="card-body">
                                    <h5>{cat}</h5>
                                    <Progress
                                        percent={((amount/totalIncomeTurnover)*100).toFixed(0)}
                                    />
                                </div>
                            </div>)
                        )
                    })
                }
            </div>
        {/* -------------------------------- */}
            <div className="col-md-3">
                <h4 className='card-header'>Categorywise Expense</h4>
                {
                    categories.map((cat,i) => {
                        const amount = allTransactions
                            .filter(transaction =>transaction.type === 'expense' && transaction.category === cat)
                            .reduce((acc,transaction)=> acc + transaction.amount, 0);
                        return (
                            amount > 0 && (
                            <div className="card mt-3" key={i}>
                                <div className="card-body">
                                    <h5>{cat}</h5>
                                    <Progress
                                        percent={((amount/totalExpenseTurnover)*100).toFixed(0)}
                                    />
                                </div>
                            </div>)
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default Chart