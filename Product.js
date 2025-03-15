const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    image: String, // URL of the product image
    description: String // Optional description
});

module.exports = mongoose.model("Product", productSchema);
