exports.getOrders = async (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => console.log(err));
};
