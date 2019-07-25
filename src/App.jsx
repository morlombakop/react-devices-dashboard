import React from 'react';
import { FormattedMessage } from 'react-intl';
import GlobalStyles from './global-styles';

const App = () => (
  <div className="instructions">
    <h1>
      <FormattedMessage id="deviceDashboard.header.title" defaultMessage="Devices Dashboard" />
    </h1>
    <p>Test Sample React App</p>
    <GlobalStyles />
  </div>
);

export default App;
