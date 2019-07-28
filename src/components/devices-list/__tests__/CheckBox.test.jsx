import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { cleanup, fireEvent, render } from '@testing-library/react';

import theme from '../../../theme.json';
import messages from '../../../i18n/en-gb.json';
import CheckBox from '../CheckBox';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('CheckBox component tests', () => {
  const props = {
    onCheck: jest.fn(),
    name: 'fake-name',
    isChecked: false,
  };

  const setUp = () => {
    const { getByTestId, rerender, getByText } = render(
      <IntlProvider locale="en-gb" messages={messages}>
        <ThemeProvider theme={theme}>
          <CheckBox {...props} />
        </ThemeProvider>
      </IntlProvider>,
    );
    const label = getByTestId('checkbox-container');
    const checkBox = label.querySelector('input');

    return { label, checkBox, getByText, rerender };
  };

  test('CheckBox component is rendered properly', () => {
    const { label, checkBox } = setUp();

    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label.childElementCount).toEqual(2);
    expect(checkBox).toBeInstanceOf(HTMLInputElement);
    expect(checkBox).toHaveAttribute('type', 'checkbox');
    expect(checkBox.name).toEqual(props.name);

    expect(checkBox).toHaveStyle(`
      margin-right: 10px;
      width: 20px;
      height: 20px;`);
  });

  test('CheckBox display text should update isChecked change', () => {
    const { checkBox, rerender, getByText } = setUp();

    expect(checkBox).toBeEnabled();
    expect(checkBox.checked).toEqual(props.isChecked);
    expect(getByText('Inactive')).toBeInTheDocument();

    const newProps = { ...props, isChecked: true };
    rerender(
      <IntlProvider locale="en-gb" messages={messages}>
        <ThemeProvider theme={theme}>
          <CheckBox {...newProps} />
        </ThemeProvider>
      </IntlProvider>,
    );

    expect(checkBox.checked).toEqual(newProps.isChecked);
    expect(getByText('Active')).toBeInTheDocument();
  });

  test('CheckBox should call onCheck on change event', () => {
    const spy = jest.spyOn(props, 'onCheck');
    const { checkBox } = setUp();

    fireEvent.click(checkBox);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).not.toHaveBeenCalledWith(checkBox.checked);
    expect(spy).toHaveBeenCalledWith(props.name);
  });
});
