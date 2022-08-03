const express = require("express");
const {
  getSizes,
  updateSize,
  addSize,
  removeSize,
} = require("../controllers/size");

const routerSize = express.Router();

routerSize.get("/sizes", getSizes);
routerSize.put("/sizes/:id", updateSize);
routerSize.post("/sizes", addSize);
routerSize.delete("/sizes/:id", removeSize);

module.exports = routerSize;
