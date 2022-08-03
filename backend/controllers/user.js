const User = require("../models/user");

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const exitsUser = await User.findOne({ email }).exec();
    if (exitsUser) {
      return res.status(400).json({ message: "Email đã tồn tại !" });
    }
    const user = await User({ fullname, email, password }).save();
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({message: "Lỗi"})
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!email) {
      return res.status(400).json({ message: "Email không tồn tại!" });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({ message: "Mật khẩu không đúng !" });
    }
    res.json({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({message: "Lỗi"})
  }
};
const updateUser = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body).exec()
        res.json(user)
        console.log(req.body);
    } catch (error) {
      res.status(400).json({message: "Lỗi"})
    }
}
const removeUser = async (req,res) => {
  try {
      const user = await User.findByIdAndDelete({_id: req.params.id}).exec()
      res.json(user)
  } catch (error) {
    res.status(400).json({message: "Lỗi"})
  }
}
const getUsers = async (req,res) => {
  try {
      const user = await User.find().select('role fullname email ').exec()
      res.json(user)
  } catch (error) {
    res.status(400).json({message: "Lỗi"})
  }
}
const getUser = async (req,res) => {
  try {
      const user = await User.findById({_id: req.params.id}).select('role fullname email ').exec()
      res.json(user)
  } catch (error) {
    res.status(400).json({message: "Lỗi"})
  }
}
module.exports = { signup, signin, updateUser, getUsers, getUser , removeUser };
