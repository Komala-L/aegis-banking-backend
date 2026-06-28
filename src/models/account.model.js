const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true
    },
    accountNumber: {
        type: String,
        required: [true, 'Account number is required'],
        unique: true,
        trim: true
    },
    accountType: {
        type: String,
        enum: {
            values: ['Savings', 'Current'],
            message: 'Account type can be either Savings or Current'
        },
        required: [true, 'Account type is required']
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        default: 'INR'
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Frozen', 'Closed'],
            message: 'Status can be either Active, Frozen or Closed'
        },
        default: 'Active'
    }
}, {
    timestamps: true
})

accountSchema.index({ user: 1, status: 1 });

const accountModel = mongoose.model('account', accountSchema);
module.exports = accountModel;