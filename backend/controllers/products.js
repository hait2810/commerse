const Products = require("../models/products");
const Categorys = require("../models/categorys");
const getProducts = async (req, res) => {
  try {
    const product = await Products.find().exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Không hiển thị được" });
  }
};

const getCProducts = async (req,res) => {
  try {
    
    const product = await Products.find({discount: {$gt:req.params.discount}}).sort({"price": req.params.price}).limit(req.params.limit).exec()
    res.json(product)
  } catch (error) {
      res.status(400).json({message: "Không hiển thị được sản phẩm"})
  }
}


const getLimitProducts = async (req, res) => {
  try {
    const product = await Products.find()
      .limit(req.params.limit)
      .sort({ createdAt: -1 })
      .exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Không thể hiển thị" });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Products.findById({ _id: req.params.id }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Không hiển thị được" });
  }
};
const addProduct = async (req, res) => {
  try {
    const product = await Products(req.body).save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Không thêm được" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    ).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Không sửa được" });
  }
};

const getProductbyCategory = async (req, res) => {
  try {
    const name = req.params.name
    const number = req.params.number
    const category = await Categorys.findOne({_id: req.params.id }).exec();
    const product = await Products.find({category}).sort({name: number}).exec();

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Không hiển thị được" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Không xoá được" });
  }
};
const searchProduct = async (req,res) => {
  try {
      const product = await Products.find({name: new RegExp(req.params.name, 'i')}).exec()
      res.json(product)
  } catch (error) {
    res.status(400).json({ message: "Không tìm được" });
  }
}
module.exports = {
  getProducts,
  getProduct,
  addProduct,
  searchProduct,
  updateProduct,
  getCProducts,
  getProductbyCategory,
  getLimitProducts,
  removeProduct,
};
