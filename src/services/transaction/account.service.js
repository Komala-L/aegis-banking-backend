const { ACCOUNT_STATUS } = require("../../constants/transactionStatus");
const AppError = require("../../utils/AppError");

const validateAccountStatus = (fromUserAccount, toUserAccount) => {
     /** 
     * 3. Check account status
    */
    if (fromUserAccount.status !== ACCOUNT_STATUS.ACTIVE || toUserAccount.status !== ACCOUNT_STATUS.ACTIVE) {
        throw new AppError (
            `Source account ${fromUserAccount.accountNumber} and Destination account ${toUserAccount.accountNumber} must be active to process transaction`,
            400
        );
    }
}

const validateSufficientBalance = async (fromUserAccount, amount ) => {
    /**
     * 4. Check sufficient balance
    */
    const balance = await fromUserAccount.getBalance();

    if (balance < amount) {
        throw new AppError (
            `Insufficient balance. Current balance is ${balance} and transaction amount is ${amount}`,
            400
        );
    }
}
module.exports = { validateAccountStatus, validateSufficientBalance }