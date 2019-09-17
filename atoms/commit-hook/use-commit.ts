import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { useDebouncedCallback } from 'use-debounce';
import { QUERY, QueryData, QueryVariables } from './query';
import { LintRule } from './types';

export function useCommit(
	commit: string,
	rules: LintRule[] = [],
	options?: QueryHookOptions<QueryData, QueryVariables>,
) {
	options = {
		variables: { commit, rules },
		fetchPolicy: 'no-cache',
		...options,
	};

	const graphql = useQuery<QueryData, QueryVariables>(QUERY, options);
	const [refetchDebounced] = useDebouncedCallback(graphql.refetch, typeof window === 'undefined' ? 0 : 500);

	return {
		...graphql,
		refetchDebounced,
	};
}
