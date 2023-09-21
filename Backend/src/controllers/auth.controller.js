const jwt = require('jsonwebtoken')
const moment = require('moment')
const argon = require('argon2')
const {
  getUserByEmail,
  createUser,
  createFriendship,
  getPageByUserId,
  createdUserFollowers,
} = require('../repository/index')
require('dotenv').config()

async function register(req, res, next) {
  try {
    const { firstName, lastName, email, password, birthday, gender } = req.body
    const user = await getUserByEmail(email)
    if (user) {
      return res.status(400).json({ message: 'Email đã tồn tại' })
    }
    const hashedPassword = await argon.hash(password)

    const fullName = `${firstName} ${lastName}`

    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')

    const avatar = process.env.AVATAR_DEFAULT
    const cover_img = process.env.COVER_IMG

    const newUser = await createUser(
      firstName,
      lastName,
      fullName,
      email,
      hashedPassword,
      birthday,
      gender,
      createdAt,
      avatar,
      cover_img,
    )

    // Tạo mã thông báo JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '365d',
    })
    // Tạo accessToken
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    })
    // Đặt token vào cookie
    res.cookie('token', token, { httpOnly: true })
    // tạo friendship
    await createFriendship(newUser.user_id)
    // tạo followers
    await createdUserFollowers(newUser.user_id)
    // Trả về client
    res
      .status(201)
      .json({ message: 'Đăng ký thành công', user: newUser, accessToken })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
async function login(req, res, next) {
  try {
    const { email, password } = req.body
    // Tìm người dùng theo email
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'Tài khoản chưa được đăng ký' })
    }
    // So sánh mật khẩu
    const passwordMatch = await argon.verify(user.password, password)
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' })
    }
    // Tạo mã thông báo JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '365d',
    })
    // Tạo accessToken
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    })
    // Đặt token vào cookie
    res.cookie('token', token, { httpOnly: true })
    // Loại password trước khi gửi
    delete user.password
    const find = await getPageByUserId(user.user_id)
    const pages = find.map((page) => {
      return {
        ...page,
        user_id: page.page_id,
      }
    })
    // const pages = { ...user_info, user_id: user_info.page_id };

    // Trả về client
    res.status(200).json({
      message: 'Đăng nhập thành công',
      user,
      pages,
      accessToken,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
module.exports = { login, register }
