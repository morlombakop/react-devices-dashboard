import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import SearchField from './SearchField';

const Container = styled.div`
  padding: 10px;
  display: inline-block;
  width: 80%;
  h2 {
    float: left;
    font-weight: 500;
    margin: 10px;
    color: ${props => props.theme.colorAccent};
  }
  form {
    margin: 10px;
    float: right;
  }
`;

const Header = () => (
  <div className="container bg-light">
    <Container>
      <h2>
        <FormattedMessage id="deviceDashboard.header.title" defaultMessage="Devices Dashboard" />
      </h2>
      <form>
        <SearchField />
      </form>
    </Container>
  </div>
);

export default Header;
