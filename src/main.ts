import { server } from "std/http/server.ts";
import {ApolloServer} from "npm:@apollo/server@^4.1"
import {startStandaloneServer} from "npm:@apollo/server@^4.1/standalone";
import {graphql}  from "npm:graphql@16.6";
import { Query } from "./resolvers/query.ts";
import { typeDefs } from "./schema.ts";
import { Mutation } from "./resolvers/mutation.ts";

const resolvers = {
  Query,
  Mutation,
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const {url} = await startStandaloneServer(server,{
    listen: {port: 7777},
})