import { PageConfig } from 'next';
import { server } from '../../api';

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};

export default server.createHandler({
	path: '/api/graphql',
});
