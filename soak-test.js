import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  duration: '2m', // Soak test for 2 minutes
  vus: 50, // Number of virtual users to maintain during the test
};

export default function () {
  const response = http.get('http://localhost:8080/login');

  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(5); // Sleep for 5 seconds between requests
}
