import { ParsedCommit } from '../commit-hook';

const structureOrder = [
	'type',
	'scope',
	'subject',
	'body',
	'footer',
];

export const renderCommit: CommitRenderer = (commit) => {
	if (!commit) {
		return undefined;
	}

	let rendered = structureOrder.reduce(
		(rendered, structure) => (
			rendered.replace(
				commit[structure],
				`<div class="commit-${structure}" data-structure="${structure}">${commit[structure]}</div>`,
			)
		),
		commit.raw,
	);

	// fix: without this we need to use enter twice to create a "proper" line break
	if (!rendered.endsWith('\n')) {
		return `${rendered.trim()}\n`;
	}

	return rendered;
};

export type CommitRenderer = (commit: ParsedCommit) => string | undefined;
