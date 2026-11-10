const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Config environment
dotenv.config();

// Connect db
const { connectDB } = require("./config/db");
connectDB();

const app = express();

app.use(cookieParser());
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: [
      // "http://localhost:5173", 
      process.env.FRONTEND_URL // Add your Vercel URL to your backend .env file
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Base Route (Health Check for deployment platforms)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));