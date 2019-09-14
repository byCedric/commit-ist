module.exports = {
	collectCoverage: false,
	testMatch: [
		'**/*.test.(ts|tsx)',
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
	},
	testPathIgnorePatterns: [
		'<rootDir>/.next/',
		'<rootDir>/node_modules/',
	],
};
