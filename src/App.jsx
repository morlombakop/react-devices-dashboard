import React from 'react';
import { FormattedMessage } from 'react-intl';

const App = () => (
  <div className="instructions">
    <h1>
      <FormattedMessage
        id="deviceDashboard.header.title"
        defaultMessage="Devices Dashboard"
      />
    </h1>
    <p>Test Sample React App</p>
  </div>
);

export default App;
