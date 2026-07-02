const { validateTransactionRequest } = require("../services/transaction/validation.service");

const createTransaction = async (req, res) => {
    try {
        const { fromUserAccount, toUserAccount } = await validateTransactionRequest(req.body);
    }
    catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            data: error.data
        });
    }
};

module.exports = { createTransaction };