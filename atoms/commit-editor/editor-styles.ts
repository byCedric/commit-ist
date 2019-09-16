import { createGlobalStyle } from 'styled-components';

export const CommitEditorStyles = createGlobalStyle`
	.commit-editor {
		font-family: 'Open Sans';
		white-space: pre;

		div {
			display: inline;
		}

		.commit-type {
			font-weight: bold;
		}

		.commit-subject {
			font-style: italic;
		}

		.commit-footer {
			text-decoration: underline;
		}
	}
`;
