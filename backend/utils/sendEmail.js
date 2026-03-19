const nodemailer = require("nodemailer")

const sendEmail = async (to, subject, text) => {

  console.log("SENDING EMAIL TO:", to)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
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
    console.log("EMAIL ERROR FULL:", error)
    throw error
  }
}

module.exports = sendEmail