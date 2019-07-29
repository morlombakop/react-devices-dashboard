import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #root {
    background-color: #000000;
    min-height: 100%;
    min-width: 100%;
    color: #fff;
  }

  .container {
    text-align: center;
    clear: both;
  }

  .bg-light {
    background-color: #1d1d1d;
  }

  ::placeholder {
    color: #ddd;
    opacity: 1;
  }

  :-ms-input-placeholder {
   color: #ddd;
  }

  input[type="text"]::-ms-input-placeholder {
   color: #ddd;
  }

  .inactive {
    opacity: 0.5;
  }
`;

export default GlobalStyle;
