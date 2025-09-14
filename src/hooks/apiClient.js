// Lightweight mock client to centralize API calls
// TODO: Replace this with real Axios/Fetch implementation

export async function mockGet(path) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 300));
  return { path };
}

export async function mockPost(path, body) {
  await new Promise((r) => setTimeout(r, 300));
  return { path, body };
}

// Example real client replacement:
// import axios from 'axios';
// export const api = axios.create({ baseURL: '/api' });
// export const get = (path) => api.get(path).then(r => r.data);
// export const post = (path, data) => api.post(path, data).then(r => r.data);


