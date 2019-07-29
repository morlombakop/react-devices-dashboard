import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { cleanup, render } from '@testing-library/react';
import { random } from 'faker';

import theme from '../../../theme.json';
import messages from '../../../i18n/en-gb.json';
import App from '../App';

jest.mock('../../../services/request', () => jest.fn());
const request = require('../../../services/request');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('App component tests', () => {
  const mockDevices = [
    {
      id: random.uuid(),
      name: random.words(2),
      unit: random.alphaNumeric(),
      value: random.number(),
      timestamp: random.number({ min: 5000 }),
      active: true,
    },
    {
      id: random.uuid(),
      name: random.words(2),
      unit: random.alphaNumeric(),
      value: random.number(),
      timestamp: random.number({ min: 5000 }),
      active: true,
    },
    {
      id: random.uuid(),
      name: random.words(2),
      unit: random.alphaNumeric(),
      value: random.number(),
      timestamp: random.number({ min: 5000 }),
      active: false,
    },
  ];

  const setUp = () => {
    const { container, getByTestId } = render(
      <IntlProvider locale="en-gb" messages={messages}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </IntlProvider>,
    );

    return { container, getByTestId };
  };

  it('App component is rendered properly', async () => {
    request.mockImplementation(() => Promise.resolve(mockDevices));
    const { container, getByTestId } = setUp();

    expect(container.childElementCount).toEqual(3);
    expect(getByTestId('devices-list-container')).toBeInTheDocument();
    expect(getByTestId('header-component')).toBeInTheDocument();
  });
});
