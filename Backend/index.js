const { ApolloServer } = require("apollo-server");
const authTypeDefs = require("./auth/authTypeDefs");
const authResolvers = require("./auth/authResolvers");
const customerTypeDefs = require("./Customer/customerTypeDefs");
const customerResolvers = require("./Customer/customerResolver");
const serviceCenterTypeDefs = require("./ServiceCenter/serviceCenterTypeDefs");
const serviceCenterResolvers = require("./ServiceCenter/serviceCenterResolver");

const db = require("./database/connection");

const server = new ApolloServer({
  typeDefs: [authTypeDefs, customerTypeDefs, serviceCenterTypeDefs],
  resolvers: [authResolvers, customerResolvers, serviceCenterResolvers],
  context: () => {
    return { db };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
