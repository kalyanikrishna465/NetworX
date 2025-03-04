import React, { useState } from "react";
import UploadCard from "../components/UploadCard";
import CardSearch from "../components/CardSearch";

const Home = () => {
  const [view, setView] = useState(null); // State to control displayed component

  return (
    <div className="home">
      {/* CSS Styles Inside Home.js */}
      <style>
        {`
          .button-container {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin-top: 50px;
          }

          .action-button {
            padding: 25px 50px;
            font-size: 24px;
            font-weight: bold;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            width: 300px;
            text-align: center;
          }

          .action-button:nth-child(1) {
            background-color: #007bff;
            color: white;
          }

          .action-button:nth-child(1):hover {
            background-color: green;
          }

          .action-button:nth-child(2) {
            background-color: #28a745;
            color: white;
          }

          .action-button:nth-child(2):hover {
            background-color: #1e7e34;
          }

          .component-container {
            margin-top: 30px;
            display: flex;
            justify-content: center;
          }
        `}
      </style>

      {/* Button Section */}
      <div className="button-container">
        <button className="action-button" onClick={() => setView("upload")}>
          Upload Card
        </button>
        <button className="action-button" onClick={() => setView("search")}>
          Card Search
        </button>
      </div>

      {/* Conditional Rendering */}
      <div className="component-container">
        {view === "upload" && <UploadCard />}
        {view === "search" && <CardSearch />}
      </div>
    </div>
  );
};

export default Home;
