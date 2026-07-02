const mongoose = require('mongoose');
const { ACCOUNT_STATUS } = require('../constants/accountStatus');
const { ACCOUNT_TYPE } = require('../constants/accountType');
const { LEDGER_ENTRY_TYPE } = require("../constants/ledgerEntryType");

const ledgerModel = require('./ledger.model');

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

accountSchema.methods.getBalance = async function () {
    const balanceData = await ledgerModel.aggregate([
        { $match: { account: this._id } },
        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [{ $eq: ['$entryType', LEDGER_ENTRY_TYPE.DEBIT] },
                        '$amount',
                        0
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [{ $eq: ['$entryType', LEDGER_ENTRY_TYPE.CREDIT] },
                        '$amount',
                        0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                balance: { $subtract: ['$totalCredit', '$totalDebit'] }
            }
        }
    ])

    if (balanceData.length == 0) {
        return 0;
    }
    return balanceData[0].balance;
}

const accountModel = mongoose.model('account', accountSchema);
module.exports = accountModel;