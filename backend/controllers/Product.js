const Product = require("../models/Product");
const { cloudinary } = require("../config/cloudinary");



// get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get single product by slug
exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// create new product with cloudinary image upload
exports.createProduct = async (req, res) => {
  try {
    const { name, slug, description, variants, emiPlans } = req.body;

    // parse JSON strings sent from Postman
    const variantsData = JSON.parse(variants);
    const emiPlansData = JSON.parse(emiPlans);

    // Upload each variant image to Cloudinary
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) throw error;
            variantsData[i].image = result.secure_url;
          }
        ).end(req.files[i].buffer);
      }
    }

    const product = await Product.create({
      name,
      slug,
      description,
      variants: variantsData,
      emiPlans: emiPlansData,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.uploadImages = async (req, res) => {
  try {
    console.log("FILES RECEIVED →", req.files);

    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const images = Array.isArray(req.files.image) ? req.files.image : [req.files.image];

    const uploadedUrls = [];

    for (let img of images) {
      const uploadResult = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "products",
      });
      uploadedUrls.push(uploadResult.secure_url);
    }

    return res.status(200).json({
      success: true,
      urls: uploadedUrls,   // return array of URLs
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

