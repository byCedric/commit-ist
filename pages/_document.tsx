import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'

class CommitistDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () => originalRenderPage({
				enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
			});

			const initialProps = await Document.getInitialProps(ctx)

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default CommitistDocument;
