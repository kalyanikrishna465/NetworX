import React, { useState } from "react";

const CardSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/search?keyword=${searchTerm}`);
      const data = await response.json();
      console.log("📊 API Response:", data);
      setResults(data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm("Are you sure you want to delete this visiting card?")) return;

    try {
      const response = await fetch("http://localhost:5000/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Visiting card deleted successfully.");
        setResults(results.filter(entry => entry.email !== email));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("❌ Error deleting card:", error);
    }
  };

  return (
    <div className="card-search">
      {/* Embedded CSS */}
      <style>
        {`
          .card-search {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
          }

          .card-search h2 {
            font-size: 24px;
            margin-bottom: 15px;
            color: #333;
          }

          .search-input {
            padding: 12px;
            font-size: 18px;
            width: 300px;
            border: 2px solid #ccc;
            border-radius: 5px;
            outline: none;
          }

          .search-button {
            margin-left: 10px;
            padding: 12px 20px;
            font-size: 18px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            transition: 0.3s;
          }

          .search-button:hover {
            background: #0056b3;
          }

          .results-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
          }

          .card-container {
            position: relative;
            margin: 15px;
            padding: 10px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            width: 320px;
            text-align: center;
          }

          .card-container img {
            width: 100%;
            border-radius: 10px;
          }

          .delete-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
            transition: 0.3s;
          }

          .delete-button:hover {
            background: darkred;
          }

          .no-results {
            font-size: 18px;
            color: #888;
            margin-top: 20px;
          }
        `}
      </style>

      {/* Search Input & Button */}
      <h2>Search Visiting Cards</h2>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Enter name, company, etc."
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      {/* Results Section */}
      <div className="results-container">
        {results.length > 0 ? (
          results.map((entry, index) => (
            <div key={index} className="card-container">
              {entry.imagePath && (
                <img src={entry.imagePath} alt="Visiting Card" />
              )}
              <button className="delete-button" onClick={() => handleDelete(entry.email)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default CardSearch;
