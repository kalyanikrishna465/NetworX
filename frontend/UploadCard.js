import React, { useState } from "react";

const UploadCard = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setMessage("");
    setError("");
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/upload", { method: "POST", body: formData });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      {/* Embedded CSS */}
      <style>
        {`
          .upload-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            padding: 30px;
            margin: 40px auto;
            width: 40%;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }

          .upload-card input {
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
          }

          .upload-card button {
            padding: 15px;
            font-size: 16px;
            font-weight: bold;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            transition: background 0.3s ease;
          }

          .upload-card button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .upload-card button:hover:not(:disabled) {
            background-color: #0056b3;
          }

          .upload-card p {
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
          }

          .upload-card p.error {
            color: red;
          }

          .upload-card p.success {
            color: green;
          }
        `}
      </style>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default UploadCard;
