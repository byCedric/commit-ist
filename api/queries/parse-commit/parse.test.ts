import { gql } from 'apollo-server-micro';
import { createTestClient } from 'apollo-server-testing';
import { server } from '../..';

const query = (commit: string) => (
	createTestClient(server).query({
		variables: { commit },
		query: gql`
			query($commit: String!) {
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
		`,
	})
);

test('parses empty commit', async () => {
	const { data } = await query('');

	expect(data).toMatchObject({
		parseCommit: null,
	});
});

test('returns the raw commit', async () => {
	const { data } = await query('feat: this is a new feature');

	expect(data).toMatchObject({
		parseCommit: { raw: 'feat: this is a new feature' },
	});
});

test('parses empty commit', async () => {
	const { data } = await query('');

	expect(data).toMatchObject({
		parseCommit: null,
	});
});

test('parses the header, type and subject', async () => {
	const { data } = await query('fix: a nice bugfix');

	expect(data).toMatchObject({
		parseCommit: {
			type: 'fix',
			subject: 'a nice bugfix',
		},
	});
});

test('parses the body', async () => {
	const { data } = await query(`docs: clarify something\n\nIt was too vague.`);

	expect(data).toMatchObject({
		parseCommit: { body: 'It was too vague.' },
	});
});

test('parses the body with mention', async () => {
	const { data } = await query(`fix: should do the trick\n\n@byCedric right?`);

	expect(data).toMatchObject({
		parseCommit: {
			body: '@byCedric right?',
			mentions: ['byCedric'],
		},
	});
});

test('parses the body with breaking change', async () => {
	const { data } = await query(`refactor: drop node support for eol nodes\n\nBREAKING CHANGE: upgrade your node`);

	expect(data).toMatchObject({
		parseCommit: {
			footer: 'BREAKING CHANGE: upgrade your node',
			notes: [{
				title: 'BREAKING CHANGE',
				text: 'upgrade your node',
			}],
		},
	});
});

test('parses the footer with reference', async () => {
	const { data } = await query(`refactor: simplify complex method\n\nShould run better now\n\nFixes #1337`);

	expect(data).toMatchObject({
		parseCommit: {
			footer: 'Fixes #1337',
			references: [{
				raw: '#1337',
				prefix: '#',
				action: 'Fixes',
				issue: '1337',
			}],
		},
	});
});
