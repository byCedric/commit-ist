import { gql } from 'apollo-server-micro';
import parser from '@commitlint/parse';

/**
 * Parse commit defines the in and ouput for parsing commits.
 */
export const typeDefs = gql`
	extend type Query {
		parseCommit(commit: String!): ParsedCommit
	}

	type ParsedCommit {
		raw: String!
		header: String!
		type: String
		scope: String
		subject: String
		body: String
		footer: String
		mentions: [String!]
		notes: [ParsedCommitNote!]
		references: [ParsedCommitReference!]
	}

	type ParsedCommitNote {
		title: String!
		text: String!
	}

	type ParsedCommitReference {
		raw: String!
		prefix: String!
		action: String
		owner: String
		repository: String
		issue: String
	}
`;

/**
 * Parse resolver is the actual response from the commit parser.
 */
export const resolvers = {
	Query: {
		parseCommit: async (root: never, input: { commit: string }) => {
			try {
				return await parser(input.commit);
			} catch {
				return null;
			}
		},
	},
};
