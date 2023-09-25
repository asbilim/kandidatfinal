import React from 'react';
import { render } from '@testing-library/react';
import Main from '../../app/auth/register/page'; // Update the path if necessary

describe('Main Component', () => {
  it('register page renders without crashing', () => {
    render(<Main />);
  });
});
