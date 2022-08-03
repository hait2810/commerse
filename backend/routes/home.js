const express = require("express");
const routerHome = express.Router();

routerHome.get("/", (req, res) => {
  res.send("/getproducts/:discount (hiển thị ra các sản phẩm cao hơn discount nhập vào)/:price(-1 hiển thị giá từ cao tới thấp, 1 từ thấp tới cao)/:limit(5)  hiển thị số sản phâmr");
});

module.exports = routerHome;
