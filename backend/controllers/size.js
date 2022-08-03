const Size = require("../models/size");

const getSizes = async (req, res) => {
  try {
    const size = await Size.find().exec();
    res.json(size);
  } catch (error) {
    res.status(400).json({ message: "Không hiển thị được" });
  }
};
const addSize = async (req, res) => {
  try {
    const size = await Size(req.body).save();
    res.json(size);
  } catch (error) {
    res.status(400).json({ message: "Không thêm được" });
  }
};

const updateSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    ).exec();
    res.json(size);
  } catch (error) {
    res.status(400).json({ message: "Không sửa được" });
  }
};

const removeSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndRemove({ _id: req.params.id }).exec();
    res.json(size);
  } catch (error) {
    res.status(400).json({ message: "Không xoá được" });
  }
};

module.exports = { getSizes, addSize, updateSize, removeSize };
