import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utils/generateToken.js'
/*
@desc    register a new user
@route   POST /api/users
@access  Public*/
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, password } = req.body
  const userExists = await User.findOne({ username })
  if (userExists) {
    res.status(400)
    throw new Error('User already exits')
  }
  const user = await User.create({
    fullname,
    username,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.fullname,
      username: user.username,
      isAdmin: user.isAdmin,
      wallet: user.wallet,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

/*
@desc    Authenticate the user and get the token
@route   POST /api/users/login
@access  Public*/
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  //   const event = await Event.find({})

  if (user && (await user.matchPassword(password))) {
    if (user.wallet > 0) {
      const registerCost = 100
      //   const updatedWallet = user.wallet - registerCost
      const updatedUser = await User.findOneAndUpdate(
        { 'username': username },
        { $set: { wallet: user.wallet - registerCost } },
        { new: true }
      )
      console.log(updatedUser)
      res.json(updatedUser)
    } else {
      res.status(401)
      throw new Error('Insufficient wallet coins to register to the event')
    }
  } else {
    res.status(401)
    throw new Error('Invalid username or password')
  }
})

/*
@desc Get all users
@route GET /api/users/
@access Private/admin
 */

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')
  res.json(users)
})

export { getUsers, registerUser, authUser }
