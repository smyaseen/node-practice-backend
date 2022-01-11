const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

let _db;

exports.mongoConnect = (callBack) => {
  mongoClient
    .connect(
      "mongodb+srv://admin:admin@cluster0.bggtf.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callBack();
    })
    .catch((err) => {
      console.log(err);

      throw err;
    });
};

exports.getDb = () => {
  if (_db) return _db;
  throw "No database found!";
};
