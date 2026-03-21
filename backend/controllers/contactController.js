const Contact = require("../models/Contact")

// CREATE contact message
exports.createContact = async (req, res) => {

  try {

    const { name, email, phone, message } = req.body

    const newContact = new Contact({
      name,
      email,
      phone,
      message
    })

    await newContact.save()

    res.status(201).json({
      message: "Message saved successfully",
      contact: newContact
    })

  } catch (error) {

    res.status(500).json({ message: "Server Error" })

  }
}