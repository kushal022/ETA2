
# Expense Tracker - MERN Stack Application

🚀 Live Demo: https://extraordinary-pudding-093afd.netlify.app/


## Overview
A full-stack expense tracking application built with MongoDB, Express.js, React, and Node.js (MERN stack). Users can track income/expenses, view transaction history, and monitor their financial balance.

## Features
- User authentication (JWT)
- Add/delete transactions
- Transaction history with filtering
- Balance calculation (income vs expenses)
- Responsive design

## Tech Stack
**Frontend:**
- React.js
- Ant design (React)
- Bootstrap CSS (styling)
- Axios (API calls)

**Backend:**
- Node.js
- Express.js
- MongoDB (database)
- Mongoose (ODM)
- JWT (authentication)

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/kushal022/ETA2.git
cd expense-tracker-mern
```
2. Set up backend:
```bash
npm install
```
3. Create .env file: 
- MONGO_URI=your_mongodb_connection_string
- SECRET_KEY=your_jwt_secret
- PORT=5000

4. Set up frontend
5. Running the App:
```bash
npm run dev
```

### Deployment

- Frontend: Hosted on Netlify
- Backend: Hosted on Render
- Database: MongoDB Atlas
## API Endpoints


```http
  https://eta2backend.onrender.com
```

| Method | Endpoint     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/api/v1/user/register` | User registration |
| `POST` | `/api/v1/user/login` | User Login |
| `POST` | `/api/v1/Transaction/getAllTransaction` |  Get All Transaction |
| `POST` | `/api/v1/Transaction/addTransaction` |  Add Transaction |
| `PUT` | `/api/v1/Transaction/editTransaction` |  Edit Transaction |
| `POST` | `/api/v1/Transaction/deleteTransaction` |  Edit Transaction |



## Developed by  [Kushal Jangid](https://www.github.com/kushal022/)

