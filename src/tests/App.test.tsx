import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App/App';

test('test works', () => {
  render(<App />);
  expect(true).toBe(true);
});
