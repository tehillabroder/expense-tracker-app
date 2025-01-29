const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    place: {
        type:String,
        require:true
    },
    amount: {
        type:Number,
        require:true
    },
    category: {
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    userId: {   // NEW: Stores the ID of the user who added the expense
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

module.exports = mongoose.model('expenses', expenseSchema)