import bcrypt from 'bcryptjs'
const users = [
  {
    fullname: 'ADMIN',
    username: 'admin',
    password: bcrypt.hashSync('ADMN$1', 10),
    isAdmin: true,
  },
  {
    fullname: 'Prajwal Machado',
    username: 'prajwal',
    password: bcrypt.hashSync('Praj$1', 10),
    wallet: 5000,
    isAdmin: false,
  },
]
export default users
