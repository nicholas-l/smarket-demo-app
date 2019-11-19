import React from 'react';
import { render } from '@testing-library/react';
import AppBar from '../AppBar';


it('renders title', () => {
  const { getByText } = render(<AppBar />);
  expect(getByText('Smarkets App')).toBeInTheDocument();
});