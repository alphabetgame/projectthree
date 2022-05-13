const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Game {
    _id: ID
    name: String
    solution: String
    level: Int
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    game: Game
    games: [Game]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addScore(score: Int, game: String): User
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
