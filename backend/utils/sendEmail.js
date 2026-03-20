const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (to, subject, text) => {
  console.log("SENDING EMAIL TO:", to)

  const msg = {
    to,
    from: process.env.EMAIL_USER, // must be verified sender
    subject,
    text,
  }

  try {
    await sgMail.send(msg)
    console.log("EMAIL SENT SUCCESS")
  } catch (error) {
    console.log("EMAIL ERROR FULL:", error.response?.body || error.message)
    throw error
  }
}

module.exports = sendEmail