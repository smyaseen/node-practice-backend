const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const { mongoConnect } = require("./util/database");
// const User = require("./models/user");
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const { routes: adminRoutes } = require("./routes/admin");
const { routes: shopRoutes } = require("./routes/shop");

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

mongoConnect(() => {
  app.listen(3000);
});
