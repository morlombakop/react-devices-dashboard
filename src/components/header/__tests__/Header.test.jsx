import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { cleanup, fireEvent, render } from '@testing-library/react';

import theme from '../../../theme.json';
import messages from '../../../i18n/en-gb.json';
import Header from '../Header';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Header component tests', () => {
  const props = {
    search: jest.fn(),
    isLoading: false,
  };

  const setUp = () => {
    const { container, getByTestId, getByText } = render(
      <IntlProvider locale="en-gb" messages={messages}>
        <ThemeProvider theme={theme}>
          <Header {...props} />
        </ThemeProvider>
      </IntlProvider>,
    );
    const searchBox = container.querySelector('input');
    const form = container.querySelector('form');
    const header = getByTestId('header-component');

    return { header, searchBox, getByText, form };
  };

  test('Header component is rendered properly', () => {
    const { header, searchBox, getByText, form } = setUp();

    expect(header).toBeInstanceOf(HTMLDivElement);
    expect(header.firstChild).toBeInstanceOf(HTMLDivElement);
    expect(header.firstElementChild.childElementCount).toEqual(2);
    expect(getByText('Devices Dashboard')).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  test('Header component has correct styles', () => {
    const { header, form } = setUp();

    expect(header).toHaveClass('container');
    expect(header).toHaveClass('bg-light');
    expect(header.classList.length).toEqual(2);

    expect(header.firstChild).toHaveStyle(`
      padding: 10px;
      display: inline-block;
      width: 80%;`);

    expect(header.querySelector('h2')).toHaveStyle(`
      float: left;
      font-weight: 500;
      margin: 10px;
      color: #ff6200;`);

    expect(form).toHaveStyle('margin: 10px; float: right;');
  });

  test('Searchbox should call search on change event', done => {
    const spy = jest.spyOn(props, 'search');
    const value = 'fake_value';
    const { searchBox } = setUp();

    fireEvent.change(searchBox, { target: { value } });

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
      done();
    }, 550);
  });

  test('Form should call search on submit event', () => {
    const spy = jest.spyOn(props, 'search');
    const value = 'fake_value1';
    const { searchBox, form } = setUp();

    fireEvent.change(searchBox, { target: { value } });
    fireEvent.submit(form);

    expect(searchBox.value).toEqual(value);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(value);
  });

  test('Form should not call search on submit event for empty input', () => {
    const spy = jest.spyOn(props, 'search');
    const { form } = setUp();
    fireEvent.submit(form);

    expect(spy).not.toHaveBeenCalled();
  });
});
