import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    lastname: 'admin',
    email: 'admin@mail.com',
    role: 'User',
    password: bcrypt.hashSync('So123456!', 10),
    isAdmin: true,
  },
  {
    name: 'Stoyann',
    lastname: 'Velten',
    email: 'user@mail.com',
    role: 'User',
    password: bcrypt.hashSync('So123456!', 10),
  },
]

export default users
