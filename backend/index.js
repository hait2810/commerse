const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routerProduct = require("./routes/products");
const routerCategory = require("./routes/categorys");
const routerHome = require("./routes/home");
const routerSize = require("./routes/size");
const routerUser = require("./routes/user");
const routerCart = require("./routes/cart");
const url =
  "mongodb+srv://haidev:ahai2001@cluster0.ziydc.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connect succsess");
  } catch (error) {
    console.log(error);
  }
}
connect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routerProduct);
app.use(routerCategory);
app.use(routerHome);
app.use(routerSize);
app.use(routerUser)
app.use(routerCart)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Đang chạy cổng", PORT);
});
