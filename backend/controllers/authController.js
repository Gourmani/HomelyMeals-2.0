const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {

    console.log("REGISTER BODY:", req.body)

    const { name, email, password } = req.body

    // EMAIL VALIDATION (optional, you can remove later)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Only valid Gmail addresses are allowed"
      })
    }

    // PASSWORD VALIDATION
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be strong"
      })
    }

    // check user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user (NO VERIFICATION REQUIRED)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: true // 🔥 important
    })

    console.log("USER CREATED:", newUser.email)

    res.status(201).json({
      message: "User registered successfully. You can login now."
    })

  } catch (error) {
    console.log("REGISTER ERROR:", error.message)
    res.status(500).json({ message: "Server error" })
  }
}


// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // NO EMAIL VERIFICATION CHECK

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.log("LOGIN ERROR:", error.message)
    res.status(500).json({ message: "Server error" })
  }
}


// ================= PROFILE =================
exports.getUserProfile = async (req, res) => {
  res.json(req.user)
}


// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    // TEMP: skip email, just return message
    res.json({
      message: "Forgot password feature temporarily disabled"
    })

  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error.message)
    res.status(500).json({ message: "Server error" })
  }
}


// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  res.json({
    message: "Reset password feature temporarily disabled"
  })
}