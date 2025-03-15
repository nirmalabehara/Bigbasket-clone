const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Set view engine
app.set("view engine", "ejs");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/bigbasketDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
const Product = require("./models/Product");

// Run this once to add sample products
async function addSampleProducts() {
    const products = [
        { name: "Apple", category: "Fruits", price: 50, image: "/images/apple.jpg" },
        { name: "Milk", category: "Dairy", price: 40, image: "/images/milk.jpg" },
        { name: "Bread", category: "Bakery", price: 30, image: "/images/bread.jpg" },
        { name: "Tomato", category: "Vegetables", price: 20, image: "/images/tomato.jpg" }
    ];
    
    await Product.insertMany(products);
    console.log("Sample products added!");
}
// Uncomment and run this function only once, then comment it again
// addSampleProducts();
const productRoute = require("./routes/products");
app.use("/", productRoute);
