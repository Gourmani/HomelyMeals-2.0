import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Hero() {

  const texts = [
  "Fresh Home-Style Meals",
  "Healthy Food for Everyday Life",
  "Affordable Meals for Students & Professionals"
]

  const [currentText, setCurrentText] = useState("")
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {

    if (index === texts.length) return

    if (subIndex === texts[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1000)
      return
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
      setCurrentText(texts[index].substring(0, subIndex))
    }, isDeleting ? 40 : 80)

    return () => clearTimeout(timeout)

  }, [subIndex, index, isDeleting])

  return (
    <section className="hero">

      <h1 className="hero-title">
        {currentText}
        <span className="cursor">|</span>
      </h1>

      <p className="hero-subtitle">
        Designed for busy students and professionals — so you can eat better every day.
      </p>

    </section>
  )
}

export default Hero