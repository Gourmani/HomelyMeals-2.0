function CategoryFilter({ category, setCategory }) {

  const categories = ["All", "Veg", "Non-Veg", "Breakfast", "Lunch", "Dinner"]

  return (
    <div className="category-filter">

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`category-btn ${category === cat ? "active" : ""}`}
        >
          {cat}
        </button>
      ))}

    </div>
  )
}

export default CategoryFilter