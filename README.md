# NetworX - Business Card Management System

NetworX is a **business card management system** that allows users to **upload, store, and search business cards efficiently**. It uses **OCR (Optical Character Recognition)** to extract text from uploaded images, enabling keyword-based searching.

---

## **📂 Project Structure**

### **Backend (Express.js & Tesseract.js)**
Located in the `backend/` directory, the backend handles **file uploads, OCR processing, structured data extraction, and API endpoints**.

- **`server.js`** – Main backend server using Express.js.
- **`uploads/`** – Stores uploaded business card images.
- **`data.json`** – Stores extracted text data from uploaded cards.
- **`utils/dataExtractor.js`** – Utility for extracting structured data.
- **`eng.traineddata`** – Tesseract.js language training data.

### **Frontend (React.js)**
Located in the `frontend/` directory, the frontend provides a **React-based UI** for interacting with the application.

#### **📁 Components (`src/components/`)**
- **`CardSearch.js`** – Allows users to search for stored business cards.
- **`UploadCard.js`** – Handles file uploads and sends them to the backend.
- **`Header.js`** – Navigation bar component.
- **`Footer.js`** – Footer section of the website.

#### **📁 Pages (`src/pages/`)**
- **`Home.js`** – Main landing page with buttons to navigate to different sections.
- **`About.js`** – Displays information about the project.

#### **📁 Styles & Config**
- **`App.js`** – Main entry point for the React app.
- **`App.css`** – Global styling for the frontend.
- **`index.js`** – Renders the React application.
- **`index.css`** – Additional styles.

---

## **🚀 Features**
✔ Upload business cards (JPEG/PNG).  
✔ Extract text using **OCR (Tesseract.js)**.  
✔ Store extracted data in `data.json`.  
✔ Search stored cards by **case-insensitive keywords**.  
✔ View stored cards with images.  
✔ Delete stored cards.  

---

## **⚡ Setup & Installation**

### **Backend Setup**
```sh
cd backend
npm install
node server.js
