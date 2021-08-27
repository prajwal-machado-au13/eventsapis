import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'

import User from './models/user.js'
import connectDB from './config/db.conn.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
