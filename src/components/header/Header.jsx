import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { func } from 'prop-types';
import debounce from 'lodash.debounce';
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

const searchFieldName = 'search';

export default class Header extends Component {
  static propTypes = {
    search: func.isRequired,
  };

  // This component does not required to be updated
  shouldComponentUpdate() {
    return false;
  }

  handleOnSearch = searchParam => {
    // improve performance by performing a single search every haft second.
    const withDelay = debounce(this.props.search, 500);
    withDelay(searchParam);
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const searchParam = new FormData(event.target).get(searchFieldName);
    if (searchParam && searchParam.trim()) {
      this.props.search(searchParam);
    }
  };

  render() {
    return (
      <div className="container bg-light">
        <Container>
          <h2>
            <FormattedMessage
              id="deviceDashboard.header.title"
              defaultMessage="Devices Dashboard"
            />
          </h2>
          <form onSubmit={this.handleOnSubmit}>
            <SearchField onChange={this.handleOnSearch} name={searchFieldName} />
          </form>
        </Container>
      </div>
    );
  }
}
