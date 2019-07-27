import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { func, string } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const Container = styled.div`
  border-radius: 5px;
  padding-left: 10px;
  background-color: ${props => props.theme.colorPrimary};
  border: solid 1px ${props => props.theme.inputBorderColor};
  svg {
    color: ${props => props.theme.colorGrey};
  }
  input {
    padding: 7px 10px;
    background-color: transparent;
    border: 0;
    outline: 0;
    color: #fff;
    font-size: inherit;
    &:focus {
      border: 0;
      outline: 0;
    }
  }
`;

const SearchField = ({ onChange, intl, name }) => {
  const [value, setValue] = useState('');

  const handleOnChange = ({ target }) => {
    onChange(target.value.trim());
    setValue(target.value);
  };

  return (
    <Container>
      <FaSearch />
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleOnChange}
        placeholder={intl.formatMessage({ id: 'deviceDashboard.input.search' })}
      />
    </Container>
  );
};

SearchField.propTypes = {
  onChange: func.isRequired,
  name: string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchField);
