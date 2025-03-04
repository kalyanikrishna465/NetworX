import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      {/* Embedded CSS */}
      <style>
        {`
          .header {
            background: #007bff;
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }

          .header h1 {
            font-size: 36px;
            font-weight: bold;
            margin: 0;
            letter-spacing: 1px;
          }

          .nav-links {
            list-style: none;
            display: flex;
            gap: 20px;
            margin: 0;
            padding: 0;
          }

          .nav-links li {
            display: inline-block;
          }

          .nav-links a {
            text-decoration: none;
            color: white;
            font-size: 18px;
            font-weight: 600;
            transition: 0.3s;
          }

          .nav-links a:hover {
            text-decoration: underline;
            color: #ffeb3b;
          }
        `}
      </style>

      <h1>NetworX</h1>

      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
