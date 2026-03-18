import { useState, useEffect } from "react"
import MealCard from "../components/MealCard"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import Loader from "../components/Loader"
import { getMeals } from "../services/mealService"

function Menu() {



  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMeals()
        console.log("Meals API response:", data) 
        setMeals(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [])

  const filteredMeals = meals.filter(meal => {

    const matchesSearch =
      meal.name.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === "All" ||
      meal.category.toLowerCase() === category.toLowerCase()

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <Loader />
  }

  return (
    <div className="menu-container">

      <h1 className="menu-title">Explore Meals</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter category={category} setCategory={setCategory} />

      <div className="meal-grid">

        {filteredMeals.length > 0 ? (
          filteredMeals.map(meal => (
            <MealCard key={meal._id} meal={meal} />
          ))
        ) : (
          <div className="empty-state">
              <h2>😕 No meals found</h2>
              <p>Try searching something else</p>
            </div>
        )}

      </div>

    </div>
  )
}

export default Menu