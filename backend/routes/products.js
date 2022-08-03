const express = require("express");
const {
  addProduct,
  getProduct,
  getProductbyCategory,
  getProducts,
  updateProduct,
  getLimitProducts,
  removeProduct,
  getCProducts,
  searchProduct,
} = require("../controllers/products");
const routerProduct = express.Router();

routerProduct.get("/products", getProducts);
routerProduct.get("/searchproducts/:name", searchProduct);
routerProduct.get("/products/:limit", getLimitProducts);
routerProduct.get("/getproducts/:discount?/:price?/:limit?", getCProducts)
routerProduct.get("/product/:id", getProduct);
routerProduct.get("/productsbycategory/:id/:name?/:number?", getProductbyCategory);
routerProduct.post("/products", addProduct);
routerProduct.put("/products/:id", updateProduct);
routerProduct.delete("/products/:id", removeProduct);
module.exports = routerProduct;
