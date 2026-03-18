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
              Tired of <span className="highlight">mess food</span> & expensive orders?
            </h2>

            <p>Mess food is repetitive.</p>
            <p>Restaurants are expensive.</p>
            <p>Cooking daily isn’t practical.</p>

            <p>
              <strong>Homely Meals solves this.</strong><br />
              Fresh, hygienic and affordable meals — delivered daily.
            </p>
          </div>

          <div className="problem-highlight">
            <p>✔ No cooking stress</p>
            <p>✔ Affordable for students</p>
            <p>✔ Clean & healthy meals</p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section fade-in">

        <h2 className="section-title">Designed for Your Daily Life</h2>

        <div className="features-grid">

          <div className="feature-card highlight-card">
            <h3>🍱 Real Home Food</h3>
            <p>Simple, clean meals — not oily junk.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>💰 Student Pricing</h3>
            <p>Affordable plans for daily use.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>📦 Flexible Plans</h3>
            <p>Daily, weekly or monthly.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>💪 Fitness Meals</h3>
            <p>High-protein options available.</p>
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

        <h2 className="section-title">Built For</h2>

        <div className="user-tags">
          <span>🎓 Students in PG / Hostel</span>
          <span>💼 Working professionals</span>
          <span>🏋️ Gym users</span>
          <span>🍽️ Healthy lifestyle seekers</span>
        </div>

      </section>

      {/* CTA */}
      <section className="cta-section fade-in">

        <h2>Eat Better. Spend Less. Live Healthier.</h2>

        <p>
          Fresh, affordable meals delivered daily.
        </p>

        <Link to="/menu">
          <button className="hero-btn">Explore Meals</button>
        </Link>

      </section>

    </div>
  )
}

export default Home