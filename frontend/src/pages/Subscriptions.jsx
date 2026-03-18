import { useEffect, useState } from "react"
import API from "../services/api"

function Subscriptions() {

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await API.get("/subscriptions/plans")
        setPlans(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPlans()
  }, [])

  const handleSubscribe = async (plan) => {
    try {

      await API.post("/subscriptions", {
        planName: plan.name,
        price: plan.price,
        mealsPerDay: plan.mealsPerDay
      })

      setSelectedPlan(plan)
      alert("Subscription successful!")

    } catch (error) {
      console.log(error)
      alert("Subscription failed")
    }
  }

  return (
    <div className="subscriptions-page">

      <h1 className="plans-title">Choose Your Plan</h1>
      <p className="plans-subtitle">
        Flexible plans designed for students, professionals & fitness goals
      </p>

      <div className="plans-grid">

        {plans.map((plan, index) => (

          <div 
            key={plan._id} 
            className={`plan-card ${index === 1 ? "popular-plan" : ""}`}
          >

            {index === 1 && (
              <span className="badge">Most Popular</span>
            )}

            <h2 className="plan-name">{plan.name}</h2>

            <p className="plan-price">
              ₹{plan.price}
              <span>/month</span>
            </p>

            <ul className="plan-features">
              <li>✔ {plan.mealsPerDay} meals per day</li>
              <li>✔ Fresh home-style food</li>
              <li>✔ Affordable pricing</li>
              <li>✔ {plan.duration} days plan</li>
            </ul>

            <button
              onClick={() => handleSubscribe(plan)}
              className="plan-btn"
            >
              Get Started
            </button>

          </div>

        ))}

      </div>

      {selectedPlan && (
        <div className="selected-plan">
          <h3>
            🎉 You selected: {selectedPlan.name}
          </h3>
        </div>
      )}

    </div>
  )
}

export default Subscriptions