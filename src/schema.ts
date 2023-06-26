import { gql } from "graphql_tag";

export const typeDefs = gql`
  type Slot {
    id: ID!
    day : Int!
    month : Int!
    year : Int!
    hour : Int!
    available : Boolean!
    dni : String!
  }

  type Query {
    test : String!
    availableSlots(day: Int, month: Int!, year: Int!) : [Slot!]!
  }

  type Mutation {
    addSlot(day: Int!, month: Int!, year: Int!, hour: Int!) : Slot!
    removeSlot(day: Int!, month: Int!, year: Int!, hour: Int!) : Slot!
    bookSlot(day: Int!, month: Int!, year: Int!, hour: Int!, dni: String!) : Slot!
  }
`;
