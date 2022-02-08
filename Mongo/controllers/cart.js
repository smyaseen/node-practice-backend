// const Cart = require("../models/cart");
// const CartItem = requiçre("../models/cart-item");
// const OrderItem = require("../models/order-item");
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      // console.log(products);
      res.json(products);
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = async (req, res, next) => {
  const { _id: prodId } = req.body;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => res.json())
    .catch((err) => console.log(err));

  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(prodId);
  //   })
  //   .then((product) => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.json({});
  //   })
  //   .catch((err) => console.log(err));
};

exports.deleteProduct = async (req, res, next) => {
  const {
    body: { id: prodId },
  } = req;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];

      return product.cartItem.destroy();
    })
    .then((result) => res.json({}))
    .catch((err) => console.log(err));
};

exports.checkout = async (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      CartItem.destroy({
        where: {
          cartId: fetchedCart.id,
        },
      });
    })
    .catch((err) => console.log(err));

  res.json({});
};
