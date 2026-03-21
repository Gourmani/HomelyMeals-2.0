import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import MealCard from "../components/MealCard"
import { getMeals } from "../services/mealService"
import { Link } from "react-router-dom"

function Home() {

  const [meals, setMeals] = useState([])

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMeals()
        setMeals(data.slice(0, 3))
      } catch (error) {
        console.log(error)
      }
    }
    fetchMeals()
  }, [])

  return (
    <div className="home-container">

      <Hero />

      {/* PROBLEM */}
      <section className="problem-section fade-in">
        <div className="problem-container">

          <div className="problem-text">
            <h2>
              Tired of <span className="highlight">mess food</span> & costly delivery apps?
            </h2>

            <p>Mess food gets repetitive and unhealthy.</p>
            <p>Food apps add extra charges like delivery, GST & platform fees.</p>
            <p>Cooking daily is time-consuming.</p>

            <p>
              <strong>Homely Meals solves this.</strong><br />
              Fresh, hygienic and affordable meals — delivered daily without hidden costs.
            </p>
          </div>

          <div className="problem-highlight">
            <p>✔ No hidden charges</p>
            <p>✔ Affordable daily meals</p>
            <p>✔ Clean & home-style cooking</p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="features-section fade-in">

        <h2 className="section-title">Why Choose Homely Meals?</h2>

        <div className="features-grid">

          <div className="feature-card highlight-card">
            <h3>Fresh Home-Style Food</h3>
            <p>Prepared with hygiene and care — just like home.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>Transparent Pricing</h3>
            <p>No platform fees, no surge pricing, no surprises.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>Flexible Plans</h3>
            <p>Choose daily, weekly or monthly subscriptions.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>Healthy Options</h3>
            <p>Balanced meals for fitness and daily nutrition.</p>
          </div>

        </div>

      </section>

      {/* POPULAR */}
      <div className="home-section fade-in">

        <h2 className="section-title">Popular Meals</h2>

        <div className="meal-grid">
          {meals.map(meal => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>

      </div>

      {/* USERS */}
      <section className="users-section fade-in">

        <h2 className="section-title">Perfect For</h2>

        <div className="user-tags">
          <span>Students in PG / Hostel</span>
          <span>Working Professionals</span>
          <span>Fitness Enthusiasts</span>
          <span>Healthy Lifestyle Seekers</span>
        </div>

      </section>

      {/* PARTY / BULK ORDER */}
      <section className="cta-section fade-in">

        <h2>Planning a Party or Event?</h2>

        <p>
          Get fresh meals in bulk at affordable prices. Perfect for small gatherings and events.
        </p>

        <Link to="/contact">
          <button className="hero-btn">Contact Us</button>
        </Link>

      </section>

      {/* FINAL CTA */}
      <section className="cta-section fade-in">

        <h2>Eat Better. Spend Less. Live Healthier.</h2>

        <p>
          Fresh, affordable meals delivered daily — without extra charges.
        </p>

        <Link to="/menu">
          <button className="hero-btn">Explore Meals</button>
        </Link>

      </section>

    </div>
  )
}

export default Home