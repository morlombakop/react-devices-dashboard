import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { string, bool, func } from 'prop-types';

const Container = styled.label`
  input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;

// This component extends Component as it need to rerender only if its isChecked props change.
// This Will result in better performance as we will need multiple instance of this component.
// We could have used React.PureComponent if all its props were serializable
export default class CheckBox extends Component {
  static propTypes = {
    name: string.isRequired,
    isChecked: bool.isRequired,
    onCheck: func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.isChecked !== nextProps.isChecked;
  }

  handleOnchange = ({ target }) => this.props.onCheck(target.name);

  render() {
    const { name, isChecked } = this.props;

    return (
      <Container htmlFor="name">
        <input name={name} type="checkbox" checked={isChecked} onChange={this.handleOnchange} />
        {isChecked ? (
          <FormattedMessage id="deviceDashboard.label.status-active" />
        ) : (
          <FormattedMessage id="deviceDashboard.label.status-inactive" />
        )}
      </Container>
    );
  }
}
