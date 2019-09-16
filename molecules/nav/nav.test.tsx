import { render } from '@testing-library/react';
import React from 'react';
import { Nav } from './nav';

test('renders zeit link', async () => {
	const { findByText } = render(<Nav />);
	const link = await findByText('ZEIT');

	expect(link).toBeDefined();
	expect(link.getAttribute('href')).toBe('https://zeit.co/now');
});

test('renders github link', async () => {
	const { findByText } = render(<Nav />);
	const link = await findByText('GitHub');

	expect(link).toBeDefined();
	expect(link.getAttribute('href')).toBe('https://github.com/zeit/next.js');
});
