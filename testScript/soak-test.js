import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse : false,
    thresholds: {
        http_req_failed: ['rate<0.02'], // http errors should be less than 2%
        //http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
    stages: [
        { duration: '30s', target: 20 },      
        { duration: '5m', target: 200 },     
        { duration: '30m', target: 300 },   
        { duration: '30s', target: 0 },     
    ],
};

export default function () {
    const APIENDPOINT = 'http://localhost:8765';
    const uniqueEmail = `user${__VU}_${__ITER}_soak@example.com`;
    const regsiterPayload = JSON.stringify({
        name: "string",
        email: uniqueEmail,
        password: "password"
      });

    const registerParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(`${APIENDPOINT}/users/register`, regsiterPayload, registerParams);
    const token = res.json('token');

    if(token){
        const protectedParams = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        const uniqueTitle = `${__VU}_${__ITER}_Activity Title_soak`
        const createActivityPayload = JSON.stringify({
            title: uniqueTitle,
            description: "Activity Description",
            maxParticipants: 10,
            startDate: "2021-01-01",
            endDate: "2021-01-02"
          })

        const protectedRes = http.post(`${APIENDPOINT}/activities`, createActivityPayload,protectedParams);
    }

    // http.batch([
    //     ['GET' , `${APIENDPOINT}`],
    //     ['POST', `${APIENDPOINT}/users/register`, regsiterPayload, registerParams]
    // ])

    sleep(1);
}
