const mongoose = require('mongoose');
const { TRANSACTION_STATUS } = require('../constants/transactionStatus');
const { TRANSACTION_TYPE } = require('../constants/transactionType');

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, 'Transaction must have a source account'],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, 'Transaction must have a destination account'],
        index: true
    },
    amount: {
        type: Number,
        required: [true, 'Transaction must have an amount'],
        min: [1, 'Transaction amount must be positive']
    },
    status: {
        type: String,
        enum: {
            values: Object.values(TRANSACTION_STATUS),
            message: 'Invalid transaction status'
        },
        default: TRANSACTION_STATUS.PENDING
    },
    transactionType: {
        type: String,
        enum: {
            values: Object.values(TRANSACTION_TYPE),
            message: 'Invalid transaction type'
        },
        required: [true, 'Transaction must have a type']
    },

    idempotencyKey: {
        type: String,
        required: [true, 'Transaction must have an idempotency key'],
        trim: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
});

transactionSchema.index({ fromAccount: 1, createdAt: -1 });
transactionSchema.index({ toAccount: 1, createdAt: -1 });

const transactionModel = mongoose.model('transaction', transactionSchema);

module.exports = transactionModel;