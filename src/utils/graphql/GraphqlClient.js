import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "http://192.168.1.51:4000/graphql",
  cache: new InMemoryCache(),
});
