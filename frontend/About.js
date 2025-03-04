import React from "react";

const About = () => {
  return (
    <div className="about">
      {/* Embedded CSS */}
      <style>
        {`
          .about {
            text-align: center;
            padding: 50px 20px;
            max-width: 800px;
            margin: auto;
            background: white;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            margin-top: 50px;
          }

          .about h1 {
            font-size: 36px;
            color: #007bff;
            margin-bottom: 20px;
          }

          .about p {
            font-size: 18px;
            color: #333;
            line-height: 1.6;
          }
        `}
      </style>

      <h1>About NetworX</h1>
      <p>NetworX helps you store and search visiting cards efficiently.</p>
    </div>
  );
};

export default About;
