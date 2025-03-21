import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '1m',
};

export default function () {
  const response = http.get('http://localhost:8080/login');

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}
