/* eslint-disable @typescript-eslint/no-use-before-define */
import classNames from 'classnames';
import { LintedCommit, ParsedCommit } from '../commit-hook';

/**
 * Commit renderer takes a parsed, and optionally a linted, commit and returns a string.
 * This string is fully rendered as html and should contain the necessary information for the editor.
 */
export function renderCommit(parsed: ParsedCommit, linted?: LintedCommit) {
	if (!parsed) {
		return undefined;
	}

	const header = renderCommitHeader(parsed, linted);
	const rendered = ['body', 'footer'].reduce(
		(rendered, structure) => (
			rendered.replace(
				parsed[structure],
				renderStructure(structure, parsed[structure], linted),
			)
		),
		parsed.raw.replace(parsed.header, header),
	);

	// fix: without this we need to use enter twice to create a "proper" line break
	if (!rendered.endsWith('\n')) {
		return `${rendered.trim()}\n`;
	}

	return rendered;
}

/**
 * Commit headers are complex and may contain additional punctuation.
 * It's a bit awkward to render, but it's the safest way.
 */
function renderCommitHeader(parsed: ParsedCommit, linted?: LintedCommit) {
	const type = renderStructure('type', parsed.type, linted);
	const scope = renderStructure('scope', parsed.scope, linted);
	const subject = renderStructure('subject', parsed.subject, linted);

	let header = '';

	if (type && scope) {
		header += `${type}(${scope}): `;
	} else if (type) {
		header += `${type}: `;
	}

	if (subject) {
		header += subject;
	}

	return renderStructure('header', header || parsed.header, linted);
}

/**
 * Commit contains multiple structure type, each of them must have an interactive element.
 * This can render all structure types and checks if they contain linter warnings or issues.
 */
function renderStructure(type: string, content: string, linted?: LintedCommit) {
	if (content) {
		const className = classNames(`commit-structure commit-structure--${type}`, {
			'commit-structure--lint-warning': linted && linted.warnings.find(issue => issue.structure === type),
			'commit-structure--lint-error': linted && linted.errors.find(issue => issue.structure === type),
		});

		return `<span class="${className}" data-structure="${type}">${content}</span>`;
	}

	return '';
}
