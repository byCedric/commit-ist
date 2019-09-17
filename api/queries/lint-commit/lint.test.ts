import { gql } from 'apollo-server-micro';
import { createTestClient } from 'apollo-server-testing';
import { LintInputRule } from './lint';
import { server } from '../..';

const query = (commit: string, rules: LintInputRule[]) => (
	createTestClient(server).query({
		variables: { commit, rules },
		query: gql`
			query($commit: String, $rules: [LintRule!]) {
				lintCommit(commit: $commit, rules: $rules) {
					valid
					input
					warnings {
						valid
						name
						message
					}
					errors {
						valid
						name
						message
					}
				}
			}
		`,
	})
);

test('lints empty commit', async () => {
	const { data } = await query('', []);

	expect(data).toMatchObject({
		lintCommit: null,
	});
});

test('lints commit without rules', async () => {
	const { data } = await query('feat: this is a nice feature', []);

	expect(data).toMatchObject({
		lintCommit: {
			valid: true,
			input: 'feat: this is a nice feature',
			warnings: [],
			errors: [],
		},
	});
});

test('lints commit with header-max-length error rule', async () => {
	const { data } = await query('feat: this is a nice feature', [{
		name: 'header-max-length',
		level: 2,
		when: 'always',
		value: 5,
	}]);

	expect(data).toMatchObject({
		lintCommit: {
			valid: false,
			input: 'feat: this is a nice feature',
			warnings: [],
			errors: [{
				valid: false,
				name: 'header-max-length',
				message: 'header must not be longer than 5 characters, current length is 28',
			}],
		},
	});
});

test('lints commit with type-enum warning rule', async () => {
	const { data } = await query('docs: clarify something', [{
		name: 'type-enum',
		level: 1,
		when: 'always',
		value: ['feature', 'fix'],
	}]);

	expect(data).toMatchObject({
		lintCommit: {
			valid: true,
			input: 'docs: clarify something',
			warnings: [{
				valid: false,
				name: 'type-enum',
				message: 'type must be one of [feature, fix]',
			}],
			errors: [],
		},
	});
});

test('lints commit with scope-enum and scope-case rules', async () => {
	const { data } = await query('fix(Rule): make sure all rules are available', [
		{
			name: 'scope-enum',
			level: 2,
			when: 'always',
			value: ['core'],
		},
		{
			name: 'scope-case',
			level: 1,
			when: 'always',
			value: ['lowercase'],
		},
	]);

	expect(data).toMatchObject({
		lintCommit: {
			valid: false,
			input: 'fix(Rule): make sure all rules are available',
			warnings: [{
				valid: false,
				name: 'scope-case',
				message: 'scope must be lowercase',
			}],
			errors: [{
				valid: false,
				name: 'scope-enum',
				message: 'scope must be one of [core]',
			}],
		}
	});
});
