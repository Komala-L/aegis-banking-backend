const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");
 
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const userRegisterController = async (req, res) => {
    const { email, name, password } = req.body;

    const isExists = await userModel.findOne({ email });
    if (isExists) {
        return res.status(422).json({ message: "User already exists with this email", status: "failed" });
    }

    const user = await userModel.create({ email, name, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "4d" });
 
    res.cookie("token", token);

    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    await emailService.sendRegistrationEmail(user.email, user.name);
}

/**
 * @desc   Login a user
 * @route  POST /api/auth/login
 * @access Public
 */
const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if(!user) {
        return res.status(401).json({ message: "Invalid email or password", status: "failed" });
    }

    const isValidPassword = await user.comparePassword(password);
    if(!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password", status: "failed" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "4d" });
    res.cookie("token", token);

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    });
}

module.exports = { userRegisterController, userLoginController };