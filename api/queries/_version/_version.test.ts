import { gql } from 'apollo-server-micro';
import { createTestClient } from 'apollo-server-testing';
import { server } from '../..';
import { version } from '../../../package.json';

test('version query returns package version', async () => {
	const { data } = await createTestClient(server).query({
		query: gql`
			query {
				_version
			}
		`,
	});

	expect(data._version).toBe(version);
});
