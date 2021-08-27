import express from 'express'
const router = express.Router()
import {
  getUsers,
  registerUser,
  authUser,
} from '../controllers/user.controller.js'
import * as auth from '../middlewares/auth.middleware.js'

router.route('/').post(registerUser).get(auth.protect, getUsers)
router.route('/login').post(authUser)

export default router
