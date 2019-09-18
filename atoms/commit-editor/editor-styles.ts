import { createGlobalStyle } from 'styled-components';

export const CommitEditorStyles = createGlobalStyle`
	.commit-editor {
		font-size: 1.5em;
		font-family: 'Open Sans';
		font-weight: 400;
		white-space: pre;

		.commit-editor-editable {
			outline: none;
		}

		.commit-structure {
			border-bottom: 3px solid transparent;
		}

		.commit-structure--type {
			/* font-weight: bold; */
		}

		.commit-structure--subject {
			/* font-style: italic; */
		}

		.commit-structure--footer {
			/* text-decoration: underline; */
		}

		.commit-structure--lint-warning {
			border-bottom-color: rgba(236, 219, 66, .56);
		}

		.commit-structure--lint-error {
			border-bottom-color: rgba(255, 0, 0, .3);
		}

		&.commit-editor--focus-type .commit-structure--type { font-weight: 600 }
		&.commit-editor--focus-scope .commit-structure--scope { font-weight: 600 }
		&.commit-editor--focus-subject .commit-structure--subject { font-weight: 600 }
	}
`;
