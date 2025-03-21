import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 VUs
    { duration: '30s', target: 50 },  // Ramp up to 50 VUs
    { duration: '30s', target: 100 }, // Ramp up to 100 VUs
    { duration: '30s', target: 200 }, // Ramp up to 200 VUs
    { duration: '30s', target: 400 }, // Ramp up to 400 VUs
  ],
};

export default function () {
  const response = http.get('http://localhost:8080/login');

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}
