import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"
import { getMealById } from "../services/mealService"

function MealDetails() {

  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const [meal, setMeal] = useState(null)

  useEffect(() => {

    const fetchMeal = async () => {
      try {
        const data = await getMealById(id)
        setMeal(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMeal()

  }, [id])

  if (!meal) {
    return <h2 className="page-loading">Loading...</h2>
  }

  return (
    <div className="meal-details">

      <img
        src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
        alt={meal.name}
        className="meal-details-img"
      />

      <div>

        <h1>{meal.name}</h1>

        <p className="meal-rating">
          ⭐ {meal.rating || "4.5"}
        </p>

        <p className="meal-price">
          ₹ {meal.price}
        </p>

        <p className="meal-desc">
          {meal.description}
        </p>

        <button
          onClick={() => addToCart(meal)}
          className="add-cart-btn"
        >
          Add to Cart
        </button>

      </div>

    </div>
  )
}

export default MealDetails