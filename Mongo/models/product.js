const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static getAll() {
    const db = getDb();
    return db.collection("products").find({}).toArray();
  }

  update(_id) {
    const db = getDb();
    return db
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectId(_id) }, { $set: this })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static delete(_id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(_id) })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
