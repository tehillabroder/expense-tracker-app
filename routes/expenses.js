const express = require('express')
const router = express.Router()

const Expense = require('../models/Expense')
const verifyToken = require('../verifyToken.js')

// Get all expenses (protected route)
router.get('/', verifyToken, async(req,res)=>{
    try{
        const expenses = await Expense.find()
        res.send(expenses)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// Get user-specific expenses (protected route)
router.get('/my-expenses', verifyToken, async(req,res)=>{
    try{
        const expenses = await Expense.find({userId:req.user._id})  // Filter by user
        res.send(expenses)
    }catch(err){
        res.status(400).send({message:err})
    }
})

// Add a new expense (protected route)
router.post('/add', verifyToken, async (req, res) => {
    const { place, amount, category, date } = req.body;

    if (!place || !amount || !category) {
        return res.status(400).send({ message: "All fields except date are required." });
    }

    const newExpense = new Expense({
        place: place,
        amount: amount,
        category: category,
        date: date || new Date(),
        userId: req.user._id   // Assign the expense to the logged-in user
    });

    try{
        const savedExpense = await newExpense.save();
        res.send(savedExpense);
    }catch(err){
        res.status(400).send({message:err});
    }
});

module.exports = router