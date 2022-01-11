const express = require("express");

const cartController = require("../controllers/cart");
const orderController = require("../controllers/order");

const router = express.Router();

router.get("/products", cartController.getProducts);
router.get("/orders", orderController.getOrders);

router.post("/add-product", cartController.postAddProduct);

router.delete("/delete-product", cartController.deleteProduct);

router.post("/checkout", cartController.checkout);

exports.routes = router;
