const uuidv4 = require('uuid/v4');

const deviceReadings = [
  {
    name: 'acceleration_x',
    unit: 'm/s2',
    value: 25.993848858558,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'acceleration_y',
    unit: 'm/s2',
    value: -128.993848858558,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: false,
  },
  {
    name: 'acceleration_z',
    unit: 'm/s2',
    value: -0.53,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'rotation_alpha',
    unit: 'deg',
    value: 356.63,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: false,
  },
  {
    name: 'rotation_beta',
    unit: 'deg',
    value: -18.14,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'rotation_gamma',
    unit: 'deg',
    value: -11.19,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'orientation',
    unit: 'deg',
    value: 0,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'latitude',
    unit: '',
    value: 52.49,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'rotation_rate_alpha',
    unit: 'deg/s',
    value: 0.04,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'rotation_rate_beta',
    unit: 'deg/s',
    value: 0.06,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
  {
    name: 'rotation_rate_gamma',
    unit: 'deg/s',
    value: 0,
    timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
    active: true,
  },
].map(device => ({ ...device, id: uuidv4() }));

module.exports = deviceReadings;
