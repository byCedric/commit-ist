import { gql } from 'apollo-server-micro';
import { GraphQLScalarType } from 'graphql';
import { transform } from 'lodash';
import lint from '@commitlint/lint';

/**
 * Parse commit defines the in and ouput for parsing commits.
 */
export const typeDefs = gql`
	scalar LintRuleValue

	extend type Query {
		lint(commit: String, rules: [LintRule!]): LintedCommit
	}

	input LintRule {
		name: String!
		level: Int!
		when: LintRuleCondition!
		value: LintRuleValue
	}

	enum LintRuleCondition {
		always
		never
	}

	type LintedCommit {
		valid: Boolean!
		input: String!
		errors: [LintedCommitIssue!]
		warnings: [LintedCommitIssue!]
	}

	type LintedCommitIssue {
		valid: Boolean!
		level: Int!
		name: String!
		message: String!
	}
`;

/**
 * Parse resolver is the actual response from the commit parser.
 */
export const resolvers = {
	LintRuleValue: new GraphQLScalarType({
		name: 'LintRuleValue',
		description: 'Any type for lint rule\'s value',
		parseValue: value => value,
		serialize: value => value,
	}),
	Query: {
		lint: async (root: never, input: LintInput) => {
			const rules = transform(input.rules || [], (config, rule) => {
				config[rule.name] = [rule.level, rule.when, rule.value];
			});

			try {
				return await lint(input.commit, rules);
			} catch {
				return null;
			}
		},
	},

};

export interface LintInput {
	commit: string;
	rules: LintInputRule[];
}

export interface LintInputRule {
	name: string;
	level: number;
	when: 'always' | 'never';
	value?: any;
}
