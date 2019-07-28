import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { cleanup, fireEvent, render } from '@testing-library/react';

import theme from '../../../theme.json';
import messages from '../../../i18n/en-gb.json';
import SearchField from '../SearchField';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('SearchField component tests', () => {
  const props = {
    onChange: jest.fn(),
    name: 'fake-name',
    isDisabled: false,
  };

  const setUp = () => {
    const { getByTestId, rerender } = render(
      <IntlProvider locale="en-gb" messages={messages}>
        <ThemeProvider theme={theme}>
          <SearchField {...props} />
        </ThemeProvider>
      </IntlProvider>,
    );
    const container = getByTestId('search-field-container');
    const textBox = container.querySelector('input');
    const icon = container.querySelector('svg');

    return { container, textBox, icon, rerender };
  };

  test('SearchField component is rendered properly', () => {
    const { container, textBox, icon } = setUp();

    expect(container).toBeInstanceOf(HTMLDivElement);
    expect(icon).toBeInTheDocument();
    expect(container.childElementCount).toEqual(2);
    expect(textBox).toBeInstanceOf(HTMLInputElement);
    expect(textBox).toHaveAttribute('type', 'text');
    expect(textBox).toHaveAttribute('placeholder', 'Search...');
    expect(textBox).toHaveAttribute('name', props.name);
  });

  test('SearchField component has correct styles', () => {
    const { container, textBox, icon } = setUp();

    expect(container).toHaveStyle(`
      border-radius: 5px;
      padding-left: 10px;
      background-color: #000000;
      border: solid 1px #555;`);

    expect(textBox).toHaveStyle(`
      padding: 7px 10px;
      background-color: transparent;
      border: 0;
      outline: 0;
      color: #fff;
      font-size: inherit;`);

    expect(icon).toHaveStyle('color: #ddd;');
  });

  test('SearchField should be disable and have new style', () => {
    const { textBox, rerender } = setUp();

    fireEvent.blur(textBox);
    expect(textBox).toHaveStyle(`
      padding: 7px 10px;
      background-color: transparent;
      border: 0;
      outline: 0;
      color: #fff;
      font-size: inherit;
      border: 0;
      outline: 0;`);

    expect(textBox).toBeEnabled();

    const newProps = { ...props, isDisabled: true };
    rerender(
      <IntlProvider locale="en-gb" messages={messages}>
        <ThemeProvider theme={theme}>
          <SearchField {...newProps} />
        </ThemeProvider>
      </IntlProvider>,
    );
    expect(textBox).toBeDisabled();
  });

  test('SearchField should call onChange', () => {
    const spy = jest.spyOn(props, 'onChange');
    const value = 'fake_value   ';
    const { textBox } = setUp();

    fireEvent.change(textBox, { target: { value } });

    expect(textBox.value).toEqual(value);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).not.toHaveBeenCalledWith(value);
    expect(spy).toHaveBeenCalledWith(value.trim());
  });
});
