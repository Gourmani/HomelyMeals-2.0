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
              Tired of <span className="highlight">mess food</span> and expensive delivery apps?
            </h2>

            <p>Mess food often feels repetitive and lacks proper nutrition.</p>
            <p>Delivery apps add extra charges like delivery fees, GST, and platform costs.</p>
            <p>Cooking every day can be time-consuming and tiring.</p>

            <p>
              <strong>That’s where Homely Meals comes in.</strong><br />
              Fresh, hygienic, and affordable meals delivered daily — without hidden charges.
            </p>
          </div>

          <div className="problem-highlight">
            <p>No hidden charges</p>
            <p>Affordable daily meals</p>
            <p>Clean, home-style cooking</p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="features-section fade-in">

        <h2 className="section-title">Why Choose Homely Meals?</h2>

        <div className="features-grid">

          <div className="feature-card highlight-card">
            <h3>Fresh Home-Style Food</h3>
            <p>Prepared with care and hygiene — just like home-cooked meals.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>Transparent Pricing</h3>
            <p>No hidden fees or extra charges — what you see is what you pay.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>Flexible Plans</h3>
            <p>Choose from daily, weekly, or monthly plans that suit your routine.</p>
          </div>

          <div className="feature-card highlight-card">
            <h3>Healthy Options</h3>
            <p>Balanced meals designed for your daily nutrition and fitness goals.</p>
          </div>

        </div>

      </section>

      {/* POPULAR */}
      <div className="home-section fade-in">

        <h2 className="section-title">Popular Meals Loved by Our Customers</h2>

        <div className="meal-grid">
          {meals.map(meal => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>

      </div>

      {/* USERS */}
      <section className="users-section fade-in">

        <h2>
          Perfect for <span className="highlight">your everyday lifestyle</span>
        </h2>

        <div className="user-tags">
          <div className="user-card">🎓 Students living in PGs or hostels</div>
          <div className="user-card">💼 Busy working professionals</div>
          <div className="user-card">💪 Fitness-focused individuals</div>
          <div className="user-card">🥗 Anyone aiming for a healthier lifestyle</div>
        </div>

      </section>

      {/* PARTY CTA */}
      <section className="cta-section fade-in">

        <h2>
          Planning a <span className="highlight">party</span> or event?
        </h2>

        <p>
          Get fresh, home-style meals in bulk at affordable prices — perfect for small gatherings, celebrations, and office events.
        </p>

        <Link to="/contact">
          <button className="hero-btn">
            Contact Us →
          </button>
        </Link>

      </section>

      {/* FINAL CTA */}
      <section className="cta-section alt fade-in">

        <h2>
          Eat better. Spend less. <span className="highlight">Live healthier</span>.
        </h2>

        <p>
          Fresh, affordable meals delivered daily — simple, reliable, and made for your routine.
        </p>

        <Link to="/menu">
          <button className="hero-btn">
            Explore Meals →
          </button>
        </Link>

      </section>

    </div>
  )
}

export default Home