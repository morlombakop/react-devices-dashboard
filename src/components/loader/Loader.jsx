import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;
  border: 10px solid ${props => props.theme.colorGrey};
  border-radius: 50%;
  border-top: 10px solid ${props => props.theme.colorAccent};
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => <Spinner data-testid="loader-container" />;

export default Loader;
