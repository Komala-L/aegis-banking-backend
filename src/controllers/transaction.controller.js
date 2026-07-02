const { validateTransactionRequest } = require("../services/transaction/validation.service");
const { validateAccountStatus, validateSufficientBalance } = require("../services/transaction/account.service");

const createTransaction = async (req, res) => {
    try {
        const { fromUserAccount, toUserAccount } = await validateTransactionRequest(req.body);
        validateAccountStatus(fromUserAccount, toUserAccount);
        await validateSufficientBalance(fromUserAccount, req.body.amount);
    }
    catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            data: error.data
        });
    }
};

module.exports = { createTransaction };