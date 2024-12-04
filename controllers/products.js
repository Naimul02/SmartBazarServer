const productsCollection = require("../models/productModels");
const { connectDB, db } = require("../utils/db");

const addProducts = async (req, res) => {};

// GET API with Pagination, Filtering, and Sorting
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "price",
      sortOrder = "asc",
      minPrice,
      maxPrice,
      location,
      category,
    } = req.query;

    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    // query object for filtering
    const query = {};

    if (minPrice) query.price = { $gte: parseInt(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: parseInt(maxPrice) };
    if (location) query.location = location;
    if (category) query.category = category;

    const products = await productsCollection
      .find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const totalProducts = await productsCollection.countDocuments(query);

    res.json({
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalItems: totalProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addProducts,
  getProducts,
};
