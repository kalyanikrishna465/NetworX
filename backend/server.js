const express = require("express");
const multer = require("multer");
const cors = require("cors");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { extractStructuredData } = require("./utils/dataExtractor");

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG, and PNG files are allowed."));
    }
    cb(null, true);
  }
});

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const imagePath = req.file.path;

  try {
    const metadata = await sharp(imagePath).metadata();
    if (metadata.width < 500 || metadata.height < 300) {
      fs.unlinkSync(imagePath); // Delete low-res image
      return res.status(400).json({ error: "Image resolution too low. Minimum 500x300 required." });
    }

    console.log("📸 Processing Image:", imagePath);

    const { data: { text } } = await Tesseract.recognize(imagePath, "eng");
    console.log("📝 Extracted Text:", text);

    let structuredData = extractStructuredData(text);

    for (const key in structuredData) {
      if (typeof structuredData[key] === "string") {
        structuredData[key] = structuredData[key].toLowerCase();
      }
    }

    structuredData.image = imagePath; // Save image path

    saveData(structuredData);

    res.json({ message: "Data saved successfully.", data: structuredData });
  } catch (error) {
    console.error("❌ Error processing image:", error);
    res.status(500).json({ error: "Failed to process image." });
  }
});

function saveData(newEntry) {
  let data = [];
  try {
    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }
  } catch (error) {
    console.error("⚠️ Error reading data.json:", error);
  }

  data.push(newEntry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  console.log("✅ Data saved:", newEntry);
}

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase(); // Convert search term to lowercase

  if (!keyword) {
    return res.status(400).json({ error: "Keyword query parameter is required." });
  }

  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

    const results = data
      .filter(entry =>
        Object.values(entry).some(value =>
          typeof value === "string" && value.toLowerCase().includes(keyword) // Convert stored values to lowercase before checking
        )
      )
      .map(entry => ({
        ...entry,
        imagePath: `http://localhost:5000/${entry.image}` // Convert to full URL
      }));

    res.json(results);
  } catch (error) {
    console.error("❌ Error searching data:", error);
    res.status(500).json({ error: "Failed to search data." });
  }
});

app.delete("/delete", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required to delete the card." });
  }

  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ error: "No data found." });
    }

    let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const entryToDelete = data.find(entry => entry.email === email);

    if (!entryToDelete) {
      return res.status(404).json({ error: "Visiting card not found." });
    }

    if (entryToDelete.image && fs.existsSync(entryToDelete.image)) {
      fs.unlinkSync(entryToDelete.image);
    }

    data = data.filter(entry => entry.email !== email);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");

    console.log(`🗑️ Deleted card for ${email}`);
    res.json({ message: "Visiting card deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete visiting card." });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
