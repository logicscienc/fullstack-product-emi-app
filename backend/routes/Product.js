const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // (You can remove this for now)
const { getAllProducts, getProductBySlug, createProduct, uploadImages } = require("../controllers/Product");

// Get all products
router.get("/", getAllProducts);

// Get single product by slug
router.get("/:slug", getProductBySlug);

// Create product (Not needed now, but keep for later)
router.post("/", upload.array("images", 5), createProduct);

// Upload image only
router.post("/upload-image", uploadImages);

module.exports = router;

