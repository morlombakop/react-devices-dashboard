const apiEndpoint = {};
const baseUrl = 'http://localhost:8888/';

// Defining readonly properties
Object.defineProperties(apiEndpoint, {
  devices: { value: `${baseUrl}devices`, writable: false },
  baseUrl: { value: baseUrl, writable: false },
});

export default apiEndpoint;
