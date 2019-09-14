import { gql } from 'apollo-server-micro';
import { version } from '../../../package.json';

/**
 * The version defines the root Query type.
 * It's a workaround for not being able to add empty types.
 */
export const typeDefs = gql`
	type Query {
		_version: String!
	}
`;

/**
 * The version resolvers only return the package version.
 */
export const resolvers = {
	Query: {
		_version: () => version,
	},
};
