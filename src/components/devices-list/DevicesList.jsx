import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import CheckBox from './CheckBox';

const Container = styled.div`
  display: inline-block;
  width: 80%;
  margin-top: 15px;
  padding: 15px 20px;
  background-color: ${props => props.theme.colorPrimaryLight};
  div > span {
    font-size: 1.1em;
    float: right;
    padding-left: 10px;
    span {
      padding-left: 5px;
      font-weight: 500;
      text-transform: capitalize;
      color: ${props => props.theme.colorAccent};
    }
  }
  table {
    padding-top: 15px;
    width: 100%;
    th,
    td {
      border-bottom: 1px solid ${props => props.theme.inputBorderColor};
      padding: 10px 10px 7px 0;
      text-align: left;
      vertical-align: center;
    }
    tr:hover {
      background-color: ${props => props.theme.colorPrimary};
    }
    th {
      font-weight: 500;
      font-size: 1.1em;
      text-transform: capitalize;
    }
  }
`;

const DevicesList = () => {
  const renderCounter = () => (
    <div>
      <span>
        100
        <FormattedMessage id="deviceDashboard.label.status-active" defaultMessage="active" />
      </span>
      <span className="inactive">
        200
        <FormattedMessage id="deviceDashboard.label.status-inactive" defaultMessage="inactive" />
      </span>
    </div>
  );

  const renderHeader = () => (
    <thead>
      <tr>
        <th>
          <FormattedMessage id="deviceDashboard.label.name" defaultMessage="name" />
        </th>
        <th>
          <FormattedMessage id="deviceDashboard.label.unit" defaultMessage="unit" />
        </th>
        <th>
          <FormattedMessage id="deviceDashboard.label.value" defaultMessage="value" />
        </th>
        <th>
          <FormattedMessage id="deviceDashboard.label.timestamp" defaultMessage="timestamp" />
        </th>
        <th>
          <FormattedMessage id="deviceDashboard.label.status" defaultMessage="status" />
        </th>
      </tr>
    </thead>
  );

  const renderBody = () => (
    <tbody>
      <tr>
        <td>Jill</td>
        <td>Smith</td>
        <td>50</td>
        <td>Jackson</td>
        <td>
          <CheckBox />
        </td>
      </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td>
        <td>94</td>
        <td>Jackson</td>
        <td>94</td>
      </tr>
      <tr>
        <td>Foo</td>
        <td>Bar</td>
        <td>87</td>
        <td>Bar</td>
        <td>87</td>
      </tr>
    </tbody>
  );

  return (
    <div className="container">
      <Container>
        {renderCounter()}
        <table>
          {renderHeader()}
          {renderBody()}
        </table>
      </Container>
    </div>
  );
};

export default DevicesList;
