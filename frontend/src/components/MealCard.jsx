import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

function MealCard({ meal }) {

  const { addToCart } = useContext(CartContext)

  return (
    <div className="meal-card">

      <Link to={`/meal/${meal._id}`} className="meal-card-link">

        <img
          src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
          alt={meal.name}
          className="meal-card-image"
        />

        <h3 className="meal-card-title">{meal.name}</h3>

      </Link>

      <div className="meal-card-info">

        <p className="meal-price">₹ {meal.price}</p>

        <p className="meal-rating">⭐ {meal.rating || "4.5"}</p>

      </div>

      <button
        onClick={() => {
          addToCart(meal)
          toast.success("Item added to cart")
        }}
        className="add-cart-btn"
      >
        Add to Cart
      </button>

    </div>
  )
}

export default MealCard