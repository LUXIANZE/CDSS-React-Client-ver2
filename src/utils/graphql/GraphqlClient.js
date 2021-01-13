import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  // uri: "https://colonoscopy-cdss-backend.et.r.appspot.com/graphql",
  uri: "https://colonoscopy-cdss-backend.et.r.appspot.com/graphql",
  cache: new InMemoryCache(),
});
