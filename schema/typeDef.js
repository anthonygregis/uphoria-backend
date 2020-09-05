const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: Int!
        password: String!
        name: String!
        birthday: String!
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
        description: String!
        audioId: ID!
        user: ID!
        likes: [ID!]!
        shares: Int!
    }
    
    type AuthPayload {
        token: String
        user: User
    }
    
    type Query {
    }
    
    type Mutation {
        signup(username: String!, CID: ID!, firstName: String!, lastName: String!, gender: String!, phone: String!, password: String!, permissionLevel: Int!, age: Int!): AuthPayload
        login(username: String!, password: String!): AuthPayload
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