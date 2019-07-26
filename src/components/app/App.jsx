import React, { Fragment } from 'react';
import GlobalStyles from '../../global-styles';
import Header from '../header';
import DevicesList from '../devices-list';

const App = () => (
  <Fragment>
    <Header />
    <DevicesList />
    <GlobalStyles />
  </Fragment>
);

export default App;
