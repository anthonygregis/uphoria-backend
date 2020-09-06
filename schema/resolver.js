require("dotenv").config()
const db = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const APP_SECRET = process.env.APP_SECRET

const resolver = {
  Query: {
    user: {
      description: "Returns a user based off their ID",
      resolve: async (_, {id}, context) => {
        return await db.User.findById(id)
      }
    },
    users: {
    	description: "Returns all users",
	    resolve: async () => {
				return await db.User.find()
	    }
    }
  },
  Mutation: {
    signup: {
    	description: "Create a new user",
	    resolve: async (_, args, context) => {
		    args.password = await bcrypt.hash(args.password, 10)
		    const newUser = await db.User.create({...args})
		    console.log("New User Created:", newUser)
		    const user = newUser

		    const token = jwt.sign({ userId: user._id }, APP_SECRET)

		    return {
			    token,
			    user,
		    }
	    }
    },
    login: {
    	description: "Login and authenticate",
	    resolve: async (_, args, context) => {
		    const loginUser = await db.User.findOne({ email: args.email })
		    if (!loginUser) {
			    throw new Error("No such user found")
		    }

		    const valid = await bcrypt.compare(args.password, loginUser.password)
		    if (!valid) {
			    throw new Error("Invalid password")
		    }

		    const user = loginUser

		    return {
			    token: jwt.sign({...user}, APP_SECRET),
			    user,
		    }
	    }
    },
	  updateUser: {
    	description: "Update a user",
		  resolve: async (_, args, context) => {
			  const { id, ...setArgs } = args
			  return await db.User.findByIdAndUpdate({_id: id}, { $set: {...setArgs} }, { "new": true })
		  }
	  },
	  deleteUser: {
    	description: "We aren't Tik Tok",
		  resolve: async (_, {id}, context) => {
			  return new Promise((resolve, reject) => {
				  const deletedUser = db.User.findByIdAndDelete(id, (err, docs) => {
				  	if(err) reject(err)
					  else resolve(true)
				  })
			  })
		  }
	  }
  }
}

module.exports = resolver