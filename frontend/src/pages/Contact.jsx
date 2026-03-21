import { useState } from "react"

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("https://homelymeals-2-0.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (res.ok) {
        alert("Message sent successfully!")
        setForm({ name: "", email: "", phone: "", message: "" })
      } else {
        alert(data.message || "Something went wrong")
      }

    } catch (error) {
      console.log(error)
      alert("Server error")
    }
  }

  return (
    <div className="contact-container">

      <h2 className="section-title">Contact Us</h2>

      <form className="contact-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message (Bulk order / enquiry)"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="hero-btn">
          Send Message
        </button>

      </form>

    </div>
  )
}

export default Contact