import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        shared_iter_scenario: {
            executor: "shared-iterations",
            vus: 5,
            iterations: 50,
            startTime: "0s",
        },
        per_vu_scenario: {
            executor: "per-vu-iterations",
            vus: 5,
            iterations: 10,
            startTime: "10s",
        },
    },
};

export default function () {
    const url = 'http://localhost:8080/capitalize';
    const payload = JSON.stringify({
        name: 'john',
        email: 'john@example.com',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response contains uppercase name': (r) => r.json().name === 'JOHN',
        'response contains uppercase email': (r) => r.json().email === 'JOHN@EXAMPLE.COM',
    });

    sleep(1);
}