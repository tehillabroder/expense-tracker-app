# Expense Tracker API  
A simple RESTful API for tracking expenses using **Node.js, Express, MongoDB, and JWT authentication**. 
Users can securely add and view their own expenses.

## Features  
- **User Authentication** – Register & Login using JWT  
- **Secure Routes** – Only authenticated users can add/view expenses  
- **Expense Management** – Add, view all, and view user-specific expenses  
- **MongoDB Integration** – Uses Mongoose to store expenses and users  

## Tech Stack  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: JWT (JSON Web Tokens)  
- **Validation**: Joi (for request validation)  

## API Endpoints  

### User Authentication  
- `POST /api/users/register` – Register a new user  
- `POST /api/users/login` – Login and get a token  

### Expense Management  
- `POST /api/expenses/add` – Add a new expense (Auth required)  
- `GET /api/expenses` – Get all expenses (Auth required)  
- `GET /api/expenses/my-expenses` – Get expenses added by the logged-in user (Auth required)  

## Installation & Setup  
**Clone the repository, install dependencies, set up environment variables.**
    ```sh
    git clone https://github.com/your-username/expense-tracker-api.git
    cd expense-tracker-api
    ```sh
    npm install
**Create a .env file in the project root and add:**
    DB_CONNECTOR=your_mongodb_uri
    TOKEN_SECRET=your_secret_key
**Run the server:**
    ```sh
    npm start