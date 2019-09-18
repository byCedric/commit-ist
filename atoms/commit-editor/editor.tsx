import React, { PureComponent } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import classNames from 'classnames';
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
	 * This detects the clicked structure type and content, and calls `onStructureClick`.
	 */
	onClick = (event: any) => {
		this.props.onStructureClick(
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
		const { lintedCommit, parsedCommit, focusStructure } = this.props;
		const html = parsedCommit ? this.renderCommit(parsedCommit, lintedCommit) : '';
		const className = classNames('commit-editor', focusStructure && `commit-editor--focus-${focusStructure}`);

		return (
			<div className={className}>
				<CommitEditorStyles />
				<ContentEditable
					data-gramm_editor='false'
					className='commit-editor-editable'
					spellCheck={false}
					html={html}
					onChange={this.onChange}
					onClick={this.onClick}
					onBlur={this.props.onBlur}
				/>
			</div>
		);
	}
}

export interface CommitEditorProps {
	lintedCommit?: LintedCommit;
	parsedCommit?: ParsedCommit;
	focusStructure?: string;
	onCommitChange?: (commit: string) => any;
	onStructureClick?: (type: string, content: string) => any;
	onStructureFocus?: (type: string, content: string) => any;
	onBlur?: (event: React.FocusEvent<HTMLDivElement>) => any;
}
