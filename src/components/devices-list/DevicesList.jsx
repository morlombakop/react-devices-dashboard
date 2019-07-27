import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { shape, string, arrayOf, bool, number, func } from 'prop-types';
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
    padding-bottom: 15px;
    span {
      padding-left: 5px;
      font-weight: 500;
      color: ${props => props.theme.colorAccent};
    }
  }
  table {
    width: 100%;
    th,
    td {
      border-bottom: 1px solid ${props => props.theme.inputBorderColor};
      padding: 10px 10px 7px 10px;
      text-align: left;
      vertical-align: center;
    }
    thead,
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

const DevicesList = ({ devices, onToggleStatus }) => {
  const renderCounter = () => {
    const activesCount = devices.filter(device => device.active).length;
    return (
      <div>
        <span>
          {activesCount}
          <span>
            <FormattedMessage id="deviceDashboard.label.status-active" defaultMessage="Active" />
            (s)
          </span>
        </span>
        <span className="inactive">
          {devices.length - activesCount}
          <span>
            <FormattedMessage
              id="deviceDashboard.label.status-inactive"
              defaultMessage="Inactive"
            />
            (s)
          </span>
        </span>
      </div>
    );
  };

  const renderHeader = () => (
    <thead>
      <tr>
        <th>#</th>
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
      {devices.map((device, index) => (
        <tr key={device.id}>
          <td>{index + 1}</td>
          <td>{device.name}</td>
          <td>{device.unit}</td>
          <td>{device.value}</td>
          <td>{device.timestamp}</td>
          <td>
            <CheckBox name={device.id} isChecked={device.active} onCheck={onToggleStatus} />
          </td>
        </tr>
      ))}
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

DevicesList.propTypes = {
  devices: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
      unit: string.isRequired,
      value: number.isRequired,
      timestamp: number.isRequired,
      active: bool.isRequired,
    }),
  ).isRequired,
  onToggleStatus: func.isRequired,
};

export default DevicesList;
