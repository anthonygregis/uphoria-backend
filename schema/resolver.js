const db = require('./models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const resolver = {
    Query: {
    },
    Mutation: {
      signup: async (_, args, context) => {
          const hashedPassword = await bcrypt.hash(args.password, 10)
          args.password = hashedPassword
          const newUser = await db.user.create({...args})
          const user = newUser.dataValues

          const token = jwt.sign({ userId: newUser.id }, APP_SECRET)

          return {
              token,
              user,
          }
      },
      login: async (_, args, context) => {
          const loginUser = await db.user.findOne({ where: { username: args.username }})
          if (!loginUser) {
              throw new Error('No such user found')
          }

          const valid = await bcrypt.compare(args.password, loginUser.password)
          if (!valid) {
              throw new Error('Invalid password')
          }

          const user = loginUser.dataValues

          return {
              token: jwt.sign({ ...user }, APP_SECRET),
              user,
          }
      },
    }
}

module.exports = resolver