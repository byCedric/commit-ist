import React from 'react';
import { CommitEditor } from '../../atoms/commit-editor';
import { LintRule, useCommit } from '../../atoms/commit-hook';

const rules: LintRule[] = [
	{
		name: 'type-enum',
		level: 2,
		when: 'always',
		value: ['feat', 'fix'],
	},
	{
		name: 'header-min-length',
		level: 1,
		when: 'always',
		value: 20,
	}
];

export const PlaygroundScreen: React.SFC = () => {
	const api = useCommit('feat: add commit editor', rules);

	return (
		<div>
			<CommitEditor
				lintedCommit={api.data ? api.data.lintCommit : undefined}
				parsedCommit={api.data ? api.data.parseCommit : undefined}
				onCommitChange={commit => api.refetchDebounced({ commit, rules })}
				onCommitClick={(type, content) => console.log('clicked', type, content)}
			/>
			<br /><br />
			<code style={{ whiteSpace: 'pre' }}>
				{JSON.stringify(api.data, null, 2)}
			</code>
		</div>
	);
};
