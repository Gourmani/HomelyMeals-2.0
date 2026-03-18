function SearchBar({ search, setSearch }) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchbar-input"
      />
    </div>
  )
}

export default SearchBar