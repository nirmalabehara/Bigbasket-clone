const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Show all products
router.get("/products", async (req, res) => {
    const products = await Product.find();
    res.render("products", { products });
});

// Show form to add a new product
router.get("/products/new", (req, res) => {
    res.render("newProduct");
});

// Add a new product
router.post("/products", async (req, res) => {
    const { name, category, price, image, description } = req.body;
    await Product.create({ name, category, price, image, description });
    res.redirect("/products");
});

// Show product details page
router.get("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("productDetails", { product });
});

// Show edit form
router.get("/products/edit/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("editProduct", { product });
});

// Update product
router.post("/products/update/:id", async (req, res) => {
    const { name, category, price, image, description } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, category, price, image, description });
    res.redirect("/products");
});

// Delete product
router.post("/products/delete/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
});

// Add product to cart
router.post("/cart/add/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!req.session.cart) req.session.cart = [];
    req.session.cart.push(product);
    res.redirect("/cart");
});

// View cart
router.get("/cart", (req, res) => {
    res.render("cart", { cart: req.session.cart || [] });
});

// Remove item from cart
router.post("/cart/remove/:index", (req, res) => {
    req.session.cart.splice(req.params.index, 1);
    res.redirect("/cart");
});

module.exports = router;
