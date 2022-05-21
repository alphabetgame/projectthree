import { gql } from "@apollo/client";

export const QUERY_GAMES = gql`
  query allGames {
    games {
      _id
      name
      solution
      level
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      scores {
        score
        game
      }
    }
  }
`;
