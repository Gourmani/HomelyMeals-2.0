const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

// ================= REGISTER =================
exports.registerUser = async (req,res)=>{

try{

console.log("REGISTER BODY:", req.body)

const {name,email,password} = req.body

// ✅ EMAIL VALIDATION (GMAIL ONLY)
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

if(!emailRegex.test(email)){
  return res.status(400).json({
    message:"Only valid Gmail addresses are allowed"
  })
}

// ✅ PASSWORD VALIDATION
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

if(!passwordRegex.test(password)){
  return res.status(400).json({
    message:"Password must be at least 8 characters and include uppercase, lowercase, number and special character"
  })
}

// check user exists
const userExists = await User.findOne({email})

if(userExists){
  return res.status(400).json({message:"User already exists"})
}

// hash password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

// create user
const newUser = await User.create({
  name,
  email,
  password:hashedPassword,
  isVerified: false
})

console.log("USER CREATED:", newUser.email)

// CREATE TOKEN
const token = jwt.sign(
  { id:newUser._id },
  process.env.JWT_SECRET,
  { expiresIn:"1d" }
)

// VERIFY LINK
const url = `https://homelymeals-2-0.onrender.com/api/auth/verify/${token}`

// SEND EMAIL
try {
  await sendEmail(
    newUser.email,
    "Verify Your Email",
    `Click this link to verify your account:\n\n${url}`
  )
  console.log("EMAIL SENT SUCCESS")
} catch (err) {
  console.log("EMAIL ERROR:", err.message)
}

// RESPONSE
res.status(201).json({
  message:"📩 Verification email sent! Please check your inbox before login."
})

}catch(error){

console.log("REGISTER ERROR:", error.message)
res.status(500).json({message:"Server error"})

}
}

// ================= VERIFY EMAIL =================
exports.verifyUser = async (req,res)=>{
try{

const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)

const user = await User.findById(decoded.id)

if(!user){
return res.status(400).json({message:"Invalid link"})
}

if(user.isVerified){
return res.send("User already verified")
}

user.isVerified = true
await user.save()

console.log("USER VERIFIED:", user.email)

//res.send("✅ Email verified successfully! You can now login.")
res.redirect("http://localhost:5173/login?verified=true")

}catch(error){
console.log("VERIFY ERROR:", error.message)
res.status(400).json({message:"Invalid or expired link"})
}
}

// ================= LOGIN =================
exports.loginUser = async (req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"Invalid credentials"})
}

// ✅ STRICT CHECK
if(user.isVerified !== true){
return res.status(400).json({
  message:"Please verify your email first"
})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
return res.status(400).json({message:"Invalid credentials"})
}

// create token
const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"7d"}
)

res.json({
message:"Login successful",
token,
user:{
id:user._id,
name:user.name,
email:user.email
}
})

}catch(error){

console.log("LOGIN ERROR:", error.message)
res.status(500).json({message:"Server error"})

}
}

// ================= PROFILE =================
exports.getUserProfile = async (req,res)=>{
res.json(req.user)
}


// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req,res)=>{
try{

const {email} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"User not found"})
}

const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"15m" }
)

const url = `http://localhost:5173/reset-password/${token}`

await sendEmail(
user.email,
"Reset Your Password",
`Click here to reset your password:\n\n${url}`
)

res.json({message:"Password reset link sent to your email"})

}catch(error){
res.status(500).json({message:"Server error"})
}
}


// ================= RESET PASSWORD =================
exports.resetPassword = async (req,res)=>{
try{

const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)

const user = await User.findById(decoded.id)

if(!user){
return res.status(400).json({message:"Invalid token"})
}

const {password} = req.body

// same password validation
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

if(!passwordRegex.test(password)){
  return res.status(400).json({
    message:"Password must be strong"
  })
}

const salt = await bcrypt.genSalt(10)
user.password = await bcrypt.hash(password,salt)

await user.save()

res.json({message:"Password reset successful"})

}catch(error){
res.status(400).json({message:"Invalid or expired token"})
}
}