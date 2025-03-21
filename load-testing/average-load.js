import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '3m', target: 50 },
    { duration: '1m', target: 10 },
  ],
};

export default function () {
  let res = http.get('http://localhost:8080/api/data');

  check(res, {
    'Status code is 200': (r) => r.status === 200,
    'Response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
