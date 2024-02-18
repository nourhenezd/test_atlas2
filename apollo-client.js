import { ApolloClient, InMemoryCache } from '@apollo/client';

const queryClient = new ApolloClient({
  uri: 'http://rupert.lsnode.net:1337/graphql',
  cache: new InMemoryCache(),
});

export default queryClient;
