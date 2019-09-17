import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import { merge } from 'lodash';

import * as _version from './queries/_version';
import * as lint from './queries/lint-commit';
import * as parse from './queries/parse-commit';

export const typeDefs = [
	_version.typeDefs,
	lint.typeDefs,
	parse.typeDefs,
];

export const resolvers = merge(
	_version.resolvers,
	lint.resolvers,
	parse.resolvers,
);

export const server = new ApolloServer({
	schema: makeExecutableSchema({ typeDefs, resolvers }),
	introspection: process.env.NODE_ENV !== 'production',
	playground: process.env.NODE_ENV !== 'production',
});
