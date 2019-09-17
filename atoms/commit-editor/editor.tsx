import React, { PureComponent } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import memoize from 'memoize-one';
import { LintedCommit, ParsedCommit } from '../commit-hook';
import { CommitEditorStyles } from './editor-styles';
import { renderCommit } from './editor-commit-render';

export class CommitEditor extends PureComponent<CommitEditorProps> {
	/**
	 * Render the commit and keep track of the input/output.
	 * It's an expensive call, so we need to memoize this.
	 */
	renderCommit = memoize(renderCommit);

	/**
	 * Invoked when the content of the editor is changed.
	 * This detects if anything is provided, if so it calls `onCommitChange`.
	 * It's debounced to prevent issues when rerendering fast with mixed up html.
	 */
	onChange = (event: ContentEditableEvent) => {
		const { onCommitChange } = this.props;
		const { innerText } = event.currentTarget;

		if (onCommitChange && innerText.trim()) {
			onCommitChange(innerText)
		}
	};

	/**
	 * Invoked when the content of the editor is clicked.
	 * This detects the clicked structure type and content, and calls `onCommitClick`.
	 */
	onClick = (event: any) => {
		this.props.onCommitClick(
			event.target === event.currentTarget
				? '<root>'
				: event.target.dataset.structure,
			event.target.innerText,
		);
	};

	/**
	 * Render the commit with it's own "global" styles.
	 * Because we can't render components within the editor,
	 * we have to use simple elements as fallback.
	 */
	render() {
		const { lintedCommit, parsedCommit } = this.props;
		const html = parsedCommit ? this.renderCommit(parsedCommit, lintedCommit) : '';

		console.log({ html });

		return (
			<div>
				<CommitEditorStyles />
				<ContentEditable
					data-gramm_editor='false'
					className='commit-editor'
					spellCheck={false}
					html={html}
					onChange={this.onChange}
					onClick={this.onClick}
				/>
			</div>
		);
	}
}

export interface CommitEditorProps {
	lintedCommit?: LintedCommit;
	parsedCommit?: ParsedCommit;
	onCommitChange?: (commit: string) => any;
	onCommitClick?: (type: string, content: string) => any;
}
