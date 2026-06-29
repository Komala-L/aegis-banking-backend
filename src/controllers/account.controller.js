const accountModel = require('../models/account.model');
const generateAccountNumber = require('../utils/accountNumber.util');

const createAccountController = async (req, res) => {

    const accountNumber = generateAccountNumber();

    try {
        const account = await accountModel.create({
            user: req.user._id,
            accountNumber,
            accountType: req.body.accountType,
            currency: req.body.currency
        });

        res.status(201).json({
            message: "Account created successfully",
            account
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    createAccountController
};