const Mongoose = require("mongoose");
const { DB_CONNECTION } = require("./config");

const connectDB = async () => {
  await Mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MongoDB Connected");
};
module.exports = connectDB;
