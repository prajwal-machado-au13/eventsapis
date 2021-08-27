import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as valid from 'validator'

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    username: usernameSchema(),
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
        'Enter a 6 character long password with 1 special character',
      ],
    },
    wallet: { type: Number, required: true, default: 5000 },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

function usernameSchema() {
  return {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 16,
    validate: [
      {
        validator: (str) => !str.match(/^admin$/i),
        message: (props) => 'Invalid username',
      },
    ],
  }
}

// function validator(str) {
//   var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
//   return regularExpression.test(str)
// }
const User = mongoose.model('User', userSchema)

export default User
