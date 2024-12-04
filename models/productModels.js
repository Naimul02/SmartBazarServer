const {db} = require("../utils/db");

const productsCollection = db.collection("products");

module.exports = productsCollection;