const express = require("express");
const {
  addCategory,
  getCategorys,
  getCategory,
  removeCategory,
  updateCategory,
} = require("../controllers/categorys");
const routerCategory = express.Router();

routerCategory.get("/categorys", getCategorys);
routerCategory.get("/categorys/:id", getCategory);
routerCategory.post("/categorys", addCategory);
routerCategory.put("/categorys/:id", updateCategory);
routerCategory.delete("/categorys/:id", removeCategory);

module.exports = routerCategory;
