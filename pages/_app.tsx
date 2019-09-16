import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';
import withApollo from 'next-with-apollo';

class CommitistApp extends App<any> {
	render() {
		const { Component, pageProps, apollo } = this.props;

		return (
			<ApolloProvider client={apollo}>
				<Component {...pageProps} />
			</ApolloProvider>
		);
	}
}

const apollo = withApollo(props => (
	new ApolloClient({
		uri: 'http://0.0.0.0:3000/api/graphql',
		cache: new InMemoryCache().restore(props.initialState || {})
	})
));

export default apollo(CommitistApp);
