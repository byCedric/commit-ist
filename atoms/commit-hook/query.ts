import { gql } from 'apollo-boost';
import { LintedCommit, LintRule, ParsedCommit } from './types';

export const QUERY = gql`
	query($commit: String!, $rules: [LintRule!]!) {
		lintCommit(commit: $commit, rules: $rules) {
			valid
			input
			warnings {
				valid
				name
				message
				structure
			}
			errors {
				valid
				name
				message
				structure
			}
		}
		parseCommit(commit: $commit) {
			raw
			header
			type
			scope
			subject
			body
			footer
			mentions
			notes {
				title
				text
			}
			references {
				raw
				prefix
				action
				owner
				repository
				issue
			}
		}
	}
`;

export interface QueryVariables {
	commit: string;
	rules: LintRule[];
}

export interface QueryData {
	lintCommit: LintedCommit;
	parseCommit: ParsedCommit;
}
