const restify = require('restify');
const { plugins } = restify;
const corsMiddleware = require('restify-cors-middleware');
const ipAddress = '127.0.0.1';
const port = '8888';
const deviceReadings = require('./deviceReadings.js');

const server = restify.createServer();
server.use(plugins.queryParser());

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
});

server.pre(cors.preflight);
server.use(cors.actual);

const PATH = '/devices';
server.get({ path: PATH }, getDeviceReading);
server.patch({ path: PATH + '/:readingName' }, patchDeviceReading);

function getDeviceReading(req, res, next) {
  res.send(200, {
    data: deviceReadings,
  });
}

function patchDeviceReading(req, res, next) {
  if (!req.params.readingName || !req.query.active) {
    res.send(400);
    return;
  }
  try {
    const timeout = Math.floor(Math.random() * 5000);
    const failRate = Math.floor(Math.random() * 100);
    if (failRate > 60) {
      res.send(400, 'device state patch failed');
      return null;
    }
    const targetIndex = deviceReadings.findIndex(
      el => el.name === req.params.readingName,
    );
    deviceReadings[targetIndex].active = req.query.active === 'true';
    setTimeout(() => {
      res.send(200, 'OK');
    }, timeout);
  } catch (e) {
    console.log(e);
    res.send(400, e);
  }
}

server.listen(port, ipAddress, function() {
  console.log('%s listening at %s ', server.name, server.url);
});
