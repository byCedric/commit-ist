import React, { useState, useEffect } from 'react';
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
		name: 'subject-min-length',
		level: 1,
		when: 'always',
		value: 20,
	},
	{
		name: 'scope-enum',
		level: 2,
		when: 'always',
		value: ['editor'],
	}
];

export const PlaygroundScreen: React.SFC = () => {
	const api = useCommit('feat(editor): add commit editor styles', rules);
	const [focus, setFocus] = useState<string>();

	return (
		<div>
			<CommitEditor
				lintedCommit={api.data ? api.data.lintCommit : undefined}
				parsedCommit={api.data ? api.data.parseCommit : undefined}
				onCommitChange={commit => api.refetchDebounced({ commit, rules })}
				onStructureClick={setFocus}
				focusStructure={focus}
				onBlur={() => setFocus(undefined)}
			/>
			<br /><br />
			<code style={{ whiteSpace: 'pre' }}>
				{JSON.stringify(api.data, null, 2)}
			</code>
		</div>
	);
};
