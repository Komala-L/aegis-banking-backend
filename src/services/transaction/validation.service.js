const transactionModel = require("../../models/transaction.model");
const accountModel = require("../../models/account.model");
const { TRANSACTION_STATUS } = require("../../constants/transactionStatus");
const AppError = require("../../utils/AppError");

const validateTransactionRequest = async (body) => {
    /**
     * 1. Validate request
     */
    const { fromAccount, toAccount, amount, idempotencyKey } = body;

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        throw new AppError('Missing required fields', 400);
    }

    const fromUserAccount = await accountModel.findById(fromAccount);
    const toUserAccount = await accountModel.findById(toAccount);

    if (!fromUserAccount || !toUserAccount) {
        throw new AppError('Account not found', 404);
    }

    /**
     * 2. Validate idempotency key
     */
    const isTransactionAlreadyExists = await transactionModel.findOne({ idempotencyKey });

    if (isTransactionAlreadyExists) {
        switch (isTransactionAlreadyExists.status) {
            case TRANSACTION_STATUS.COMPLETED:
                throw new AppError (
                    "Transaction has already been completed",
                    200,
                    isTransactionAlreadyExists 
                );

            case TRANSACTION_STATUS.PENDING:
                throw new AppError (
                    "Transaction is already in progress",
                    200
                );

            case TRANSACTION_STATUS.FAILED:
                throw new AppError (
                    "Transaction has been failed, please try again",
                    409
                );

            case TRANSACTION_STATUS.REVERSED:
                throw new AppError (
                    "Transaction has been reversed, please try again",
                    409
                );
        }
    }
    return { fromUserAccount, toUserAccount };
}

module.exports = { validateTransactionRequest }