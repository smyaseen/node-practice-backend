const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  req.user
    .getProducts()
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
  req.user
    .createProduct({
      title,
      description,
      price,
      imageUrl,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({});
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.body;
  Product.destroy({
    where: {
      id,
    },
  })
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
    id,
    product: { title, description, imageUrl, price },
  } = req.body;
  Product.update(
    { title, description, price, imageUrl },
    {
      where: {
        id,
      },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({});
};
