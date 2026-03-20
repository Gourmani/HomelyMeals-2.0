const nodemailer = require("nodemailer")
const dns=require("dns")
dns.setDefaultResultOrder("ipv4first") // avoid IPv6 issues on some platforms (e.g. Render)

const sendEmail = async (to, subject, text) => {

  console.log("SENDING EMAIL TO:", to)

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // IMPORTANT for Render
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 10000 // avoid 30s freeze
  })

  try {
    const info = await transporter.sendMail({
      from: `"Homely Meals" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    })

    console.log("EMAIL SENT:", info.response)

  } catch (error) {
    console.log("EMAIL ERROR FULL:", error.message)
    throw error
  }
}

module.exports = sendEmail