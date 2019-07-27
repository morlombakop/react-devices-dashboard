import React, { Fragment, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';
import identity from 'ramda/src/identity';
import memoizeWith from 'ramda/src/memoizeWith';

import apiEndpoint from '../../config/api-endpoint';
import request from '../../services/request';
import GlobalStyles from '../../global-styles';
import Header from '../header';
import DevicesList from '../devices-list';

const App = ({ intl }) => {
  const [devicesReading, setDevicesReading] = useState([]);
  const [pristineData, setPristineData] = useState([]);

  const sortDevices = devices => devices.sort((a, b) => a.name.localeCompare(b.name));

  if (pristineData.length === 0) {
    // fetch devices reading on app load
    request(apiEndpoint.devices).then(res => {
      const sorted = sortDevices(res.data);
      setPristineData(sorted);
      setDevicesReading(sorted);
    });
  }

  const setDeviceStatus = (id = '') => {
    const deviceToUpdate = devicesReading.find(device => device.id === id);

    if (deviceToUpdate) {
      deviceToUpdate.active = !deviceToUpdate.active;
      const { name, active } = deviceToUpdate;

      request(`${apiEndpoint.devices}/${name}?active=${active}`, { method: 'PATCH' })
        .then(() => {
          const updatedDevices = [
            ...devicesReading.filter(device => device.id !== id),
            deviceToUpdate,
          ];
          setDevicesReading(sortDevices(updatedDevices));
          toast.success(
            intl.formatMessage({ id: 'deviceDashboard.message.device-status-updated' }),
          );
        })
        .catch(() =>
          toast.error(intl.formatMessage({ id: 'deviceDashboard.message.device-status-failed' })),
        );
    }
  };

  // Cache the result of the filter operation
  const findByName = memoizeWith(identity, name =>
    pristineData.filter(device =>
      device.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
    ),
  );

  const handleSearch = name => {
    if (name) {
      setDevicesReading(findByName(name));
    } else {
      setDevicesReading(pristineData);
    }
  };

  return (
    <Fragment>
      <Header search={handleSearch} />
      <DevicesList devices={devicesReading} onToggleStatus={setDeviceStatus} />
      <ToastContainer />
      <GlobalStyles />
    </Fragment>
  );
};

App.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(App);
