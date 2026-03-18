function Footer() {
  return (
    <footer className="footer">

      <h3>Homely Meals</h3>

      <p className="footer-text">
        Fresh homemade food delivered to your doorstep.
      </p>

      <p className="footer-copy">
        © {new Date().getFullYear()} Homely Meals. All rights reserved.
      </p>

    </footer>
  )
}

export default Footer