import { useEffect, useState } from "react"
import API from "../services/api"

function AdminMeals() {

  const [meals, setMeals] = useState([])

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    type: ""
  })

  const fetchMeals = async () => {
    try {
      const res = await API.get("/meals")
      setMeals(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddMeal = async (e) => {
    e.preventDefault()

    try {

      await API.post("/meals", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category.toLowerCase(),
        type: form.type.toLowerCase(),
        available: true
      })

      alert("Meal added successfully")

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        type: ""
      })

      fetchMeals()

    } catch (error) {
      console.log(error)
      alert("Failed to add meal")
    }
  }

  const deleteMeal = async (id) => {
    try {
      await API.delete(`/admin/meals/${id}`)
      setMeals(meals.filter(meal => meal._id !== id))
    } catch (error) {
      console.log(error.response?.data || error)
      alert("Delete failed")
    }
  }

  return (
    <div className="admin-container">

      <h1 className="admin-title">Manage Meals</h1>

      {/* ADD MEAL FORM */}
      <form className="meal-form" onSubmit={handleAddMeal}>

        <input
          name="name"
          placeholder="Meal Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        {/* TYPE */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <button type="submit" className="add-btn">
          Add Meal
        </button>

      </form>

      {/* TABLE */}
      <table className="admin-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {meals.map(meal => (
            <tr key={meal._id}>

              <td>{meal._id.slice(-5)}</td>
              <td>{meal.name}</td>
              <td>₹{meal.price}</td>
              <td>{meal.category}</td>
              <td>{meal.type}</td>

              <td>
                <button
                  onClick={() => deleteMeal(meal._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default AdminMeals