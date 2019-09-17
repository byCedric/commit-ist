import { createGlobalStyle } from 'styled-components';

export const CommitEditorStyles = createGlobalStyle`
	.commit-editor {
		font-family: 'Open Sans';
		white-space: pre;

		.commit-structure--type {
			font-weight: bold;
		}

		.commit-structure--subject {
			font-style: italic;
		}

		.commit-structure--footer {
			text-decoration: underline;
		}

		.commit-lint--warning {
			color: green;
		}

		.commit-lint--error {
			color: red;
		}
	}
`;
