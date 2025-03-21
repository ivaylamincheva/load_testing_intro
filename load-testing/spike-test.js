import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp up to 10 VUs
    { duration: '10s', target: 100 }, // Spike to 100 VUs
    { duration: '10s', target: 10 }, // Ramp down to 10 VUs
  ],
};

export default function () {
  const response = http.get('http://localhost:8080/login');

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}
