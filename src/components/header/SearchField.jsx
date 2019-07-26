import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

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

// Inject intl here please.
const SearchField = () => (
  <Container>
    <FaSearch />
    <input type="text" placeholder="Search..." />
  </Container>
);

export default SearchField;
