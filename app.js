const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
app.use(bodyParser.json())

const expensesRoute = require('./routes/expenses')
const authRoute = require('./routes/userAuth')
app.use('/api/expenses', expensesRoute)
app.use('/api/users', authRoute)

try{
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_CONNECTOR) 
    console.log('Database is connected.')
}catch(err){
    console.log(err)
    process.exit()
}

app.listen(3000,()=>{
    console.log('Server is up and running.')
})