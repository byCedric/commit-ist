import { Commit } from '@commitlint/parse';

export type ParsedCommit = Commit;

export interface LintRule {
	name: string;
	level: LintRuleLevel;
	when: LintRuleCondition;
	value?: any;
}

export type LintRuleLevel = 1 | 2;
export type LintRuleCondition = 'always' | 'never';

export interface LintedCommit {
	valid: boolean;
	input: string;
	errors: LintedCommitIssue[];
	warnings: LintedCommitIssue[];
}

export interface LintedCommitIssue {
	name: string
	valid: boolean;
	level: LintRuleLevel;
	message: string;
}
