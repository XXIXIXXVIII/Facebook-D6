/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable quotes */
const jwt = require("jsonwebtoken");
// Verify token JWT
const authentication = (req, res, next) => {
  try {
    // Lấy token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decoded;

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Validate đăng ký
const validateRegister = (req, res, next) => {
  const { firstName, lastName, email, password, birthday, gender } = req.body;

  // Kiểm tra xem tất cả các trường có giá trị không trống
  if (!firstName || !lastName || !email || !password || !birthday || !gender) {
    return res.status(400).json({ message: "Vui lòng cung cấp đủ thông tin" });
  }
  if (password.length < 8) {
    return res.status(400).json({
      message: "Mật khẩu phải nhiều hơn 8 kí tự",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    return res.status(400).json({ message: "Email không hợp lệ" });
  }

  next();
};
// Validate đăng nhập
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Vui lòng nhập đủ email và mật khẩu" });
  }
  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    return res.status(400).json({ message: "Email không hợp lệ" });
  }
  next();
};
module.exports = {
  validateRegister,
  validateLogin,
  authentication,
};
