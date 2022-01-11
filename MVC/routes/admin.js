const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/products", productsController.getProducts);

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

router.delete("/delete-product", productsController.deleteProduct);

router.put("/edit-product", productsController.editProduct);

exports.routes = router;

// module.exports = router;
