import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { cleanup, render } from '@testing-library/react';
import { random } from 'faker';

import theme from '../../../theme.json';
import messages from '../../../i18n/en-gb.json';
import DevicesList from '../DevicesList';

afterEach(cleanup);

describe('DevicesList component tests', () => {
  const props = {
    onToggleStatus: jest.fn(),
    devices: [
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
    ],
  };

  const setUp = (componentProps = props) => {
    const { getByTestId, getByText, getAllByText } = render(
      <IntlProvider locale="en-gb" messages={messages}>
        <ThemeProvider theme={theme}>
          <DevicesList {...componentProps} />
        </ThemeProvider>
      </IntlProvider>,
    );
    const container = getByTestId('devices-list-container');
    const table = container.querySelector('table');

    return { container, table, getAllByText, getByText };
  };

  test('DevicesList component is rendered properly', () => {
    const { container, table, getAllByText } = setUp();

    expect(container).toBeInstanceOf(HTMLDivElement);
    expect(container.childElementCount).toEqual(1);
    expect(container.firstChild.childElementCount).toEqual(2);

    expect(getAllByText('Inactive').length).toBeGreaterThan(
      props.devices.filter(d => !d.active).length,
    );
    expect(getAllByText('Active').length).toBeGreaterThan(
      props.devices.filter(d => d.active).length,
    );

    expect(table).toBeInstanceOf(HTMLTableElement);
    expect(table.querySelectorAll('thead').length).toEqual(1);
    expect(table.querySelectorAll('tbody').length).toEqual(1);
    expect(table.querySelectorAll('tr').length).toEqual(props.devices.length + 1);

    const tableBody = table.querySelector('tbody');
    expect(tableBody.querySelectorAll('tr').length).toEqual(props.devices.length);
    expect(tableBody.querySelectorAll('input[type="checkbox"]').length).toEqual(
      props.devices.length,
    );

    const tableRows = table.querySelectorAll('tr');
    expect(tableRows.length).toEqual(4);
    tableRows.forEach(tableRow => expect(tableRow.cells.length).toEqual(6));
  });

  test('DevicesList renders No dada', () => {
    const { table, container, getByText } = setUp({ ...props, devices: [] });

    expect(getByText('No results ...')).toBeInTheDocument();
    expect(table).toEqual(null);
    expect(container.firstChild.childElementCount).toEqual(1);
  });

  test('DevicesList table header is rendered properly', () => {
    const { table } = setUp();
    expect(table.querySelector('thead')).toMatchInlineSnapshot(`
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            <span>
              name
            </span>
          </th>
          <th>
            <span>
              unit
            </span>
          </th>
          <th>
            <span>
              value
            </span>
          </th>
          <th>
            <span>
              timestamp
            </span>
          </th>
          <th>
            <span>
              status
            </span>
          </th>
        </tr>
      </thead>
    `);
  });

  test('DevicesList counter is rendered properly', () => {
    const { container } = setUp();
    const counter = container.firstElementChild.firstElementChild;

    expect(counter.firstElementChild).toMatchInlineSnapshot(`
            <span>
              2
              <span>
                <span>
                  Active
                </span>
                (s)
              </span>
            </span>
        `);

    expect(counter.lastElementChild).toMatchInlineSnapshot(`
            <span
              class="inactive"
            >
              1
              <span>
                <span>
                  Inactive
                </span>
                (s)
              </span>
            </span>
        `);
  });
});
