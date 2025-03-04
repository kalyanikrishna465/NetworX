import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Embedded CSS */}
      <style>
        {`
          .footer {
            background: #007bff;
            color: white;
            text-align: center;
            padding: 15px 0;
            font-size: 16px;
            font-weight: 500;
            position: fixed;
            bottom: 0;
            width: 100%;
            box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <p>© 2025 NetworX | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
