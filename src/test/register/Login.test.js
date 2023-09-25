import { render } from '@testing-library/react';
import Main from '../../app/auth/login/page'; // Update the path if necessary
import React from 'react';
// Mocking useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));


describe('Main Component', () => {
  it('the login page renders without crashing', () => {
    render(<Main />);
  });
});
