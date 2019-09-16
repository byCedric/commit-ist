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
];

export const PlaygroundScreen: React.SFC = () => {
	const api = useCommit('feat: add commit editor', rules);

	return (
		<div>
			<CommitEditor
				commit={api.data ? api.data.parse : undefined}
				onCommitChange={commit => api.refetchDebounced({ commit, rules })}
				onCommitClick={(type, content) => console.log('clicked', type, content)}
			/>
			<code style={{ whiteSpace: 'pre' }}>
				{JSON.stringify(api.data, null, 2)}
			</code>
		</div>
	);
};
