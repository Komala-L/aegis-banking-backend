const mongoose = require('mongoose');
const { ACCOUNT_STATUS } = require('../constants/accountStatus');
const { ACCOUNT_TYPE } = require('../constants/accountType');

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
            values: Object.values(ACCOUNT_TYPE),
            message: `Account type can be either ${Object.values(ACCOUNT_TYPE).join(", ")}`
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
            values: Object.values(ACCOUNT_STATUS),
            message: `Status can be ${Object.values(ACCOUNT_STATUS).join(", ")}`
        },
        default: ACCOUNT_STATUS.ACTIVE
    }
}, {
    timestamps: true
})

accountSchema.index({ user: 1, status: 1 });

const accountModel = mongoose.model('account', accountSchema);
module.exports = accountModel;