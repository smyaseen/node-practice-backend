const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  Product.getAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json([]);
    });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, description, price, imageUrl } = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    req.user._id
  );

  product
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({});
};

exports.deleteProduct = async (req, res, next) => {
  const { _id } = req.body;
  Product.delete(_id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({});
};

exports.editProduct = async (req, res, next) => {
  const {
    _id,
    product: { title, description, imageUrl, price },
  } = req.body;

  const product = new Product(title, price, description, imageUrl);
  product
    .update(_id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({});
};
