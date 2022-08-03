const Categorys = require("../models/categorys");
const Products = require("../models/products");
const getCategorys = async (req, res) => {
  try {
    const category = await Categorys.find().exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Không hiển thị được" });
  }
};
const getCategory = async (req, res) => {
  try {
    const category = await Categorys.findById({ _id: req.params.id }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Không hiển thị được" });
  }
};

const addCategory = async (req, res) => {
  try {
    const category = await Categorys(req.body).save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Không thêm được" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Categorys.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    ).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Không sửa được" });
  }
};
const removeCategory = async (req, res) => {
  try {
    await Products.deleteMany({ category: req.params.id }).exec();
    await Categorys.findByIdAndDelete({ _id: req.params.id }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  removeCategory,
  updateCategory,
  addCategory,
  getCategory,
  getCategorys,
};
