import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Container = styled.label`
  input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleOnchange = ({ target }) => {
    setIsChecked(target.checked);
  };

  return (
    <Container htmlFor="name">
      <input name="name" type="checkbox" checked={isChecked} onChange={handleOnchange} />
      <FormattedMessage id="deviceDashboard.label.status-active" />
    </Container>
  );
};

export default CheckBox;
