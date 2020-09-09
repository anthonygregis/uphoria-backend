const {gql} = require("apollo-server")

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`    
  # Custom Scalars
  scalar Date

  # Output Type Definitions
  type User {
    id: ID!
    username: String!
    email: String
    password: String!
    name: String!
    birthday: Date
    profile: Profile!
    followingUsers: [ID!]!
    videos: [Video!]!
  }

  type Profile {
    bio: String!
    instagramUrl: String!
    personalUrl: String!
  }

  type Video {
    id: ID!
	  videoUrl: String!
    description: String!
    userId: ID!
    likes: [ID!]!
    shares: Int!
	  createdAt: Date!
  }

  type AuthPayload {
    token: String
    user: User
  }
  
  # Input Type Definitions
  input userProfile {
      bio: String
      instagramUrl: String
      personalUrl: String
  }
  
  # Root Definitions (CRUD)
  type Query {
    user(id: ID!, privilegedSecret: String): User!
	  users(privilegedSecret: String): [User!]!
	  video(id: ID!): Video!
	  videos: [Video!]!
  }
  

  type Mutation {
    signup(username: String!, email: String!, password: String!, name: String!, birthday: Date!): AuthPayload
    login(email: String!, password: String!): AuthPayload
	  updateUser(id: ID!, username: String, email: String, name: String, birthday: Date, profile: userProfile): User!
	  deleteUser(id: ID!): Boolean!
	  createVideo(description: String!, userId: ID!, file: Upload!): Boolean!
	  updateVideo(id: ID!, description: String, likeId: ID, share: Int): Video!
	  deleteVideo(id: ID!): Boolean!
	  deleteVideos: Boolean!
  }
`

// id: ID!
//   username: String!
//   email: Int!
//   password: String!
//   name: String!
//   birthday: String!
//   profile: Profile!
//   followingUsers: [ID!]!
//   videos: [Video!]!

/* if (audioId) {
  process video with ffmpeg and upload to cloudinary
  get return cloudinary video url
  db.video.create({...args})
  return video object to user
} else {
  process video ffmpeg and upload to cloudinary
  THEN split audio off processed video and upload to cloudinary
  get return cloudinary video url and audio url
  db.audio.create({...returnCloudinaryArgs})
  db.video.create({...args})
  return Video object to user
}*/

module.exports = typeDefs