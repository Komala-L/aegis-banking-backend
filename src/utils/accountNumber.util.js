const generateAccountNumber = () => {
    return ( Date.now().toString() + Math.floor(1000 + Math.random() * 9000) );
}

module.exports = generateAccountNumber;