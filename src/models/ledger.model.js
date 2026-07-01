const mongoose = require('mongoose');
const { ENTRY_TYPE } = require('../constants/entryType');

const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true, 'Ledger entry must be associated with an account'],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required for a ledger entry'],
        min: [1, 'Amount must be greater than 0'],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction',
        required: [true, 'Ledger entry must be associated with a transaction'],
        index: true,
        immutable: true
    },
    entryType: {
        type: String,
        enum: {
            values: Object.values(ENTRY_TYPE),
            message: 'Ledger entry type must be either DEBIT or CREDIT'
        },
        required: [true, 'Ledger entry type is required'],
        immutable: true
    }
}, {
    timestamps: true
});

const preventLedgerModification = () => {
    throw new Error('Ledger entries cannot be modified or deleted');
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('findOneAndDelete', preventLedgerModification);
ledgerSchema.pre('findOneAndReplace', preventLedgerModification);
ledgerSchema.pre('replaceOne', preventLedgerModification);
ledgerSchema.pre("save", function () {
    if (!this.isNew) {
        preventLedgerModification();
    }
});

ledgerSchema.index({ account: 1, createdAt: 1 });
ledgerSchema.index({ transaction: 1 });

const ledgerModel = mongoose.model('ledger', ledgerSchema);

module.exports = ledgerModel;