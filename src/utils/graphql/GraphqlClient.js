import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  // uri: "https://colonoscopy-cdss-backend.et.r.appspot.com/graphql",
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
