import express from 'express'
import jwt from 'jsonwebtoken'

const jwtRoute = express.Router()
const privateKey = `
-----BEGIN PRIVATE KEY-----
MsvE+qfYGiAgLqLfwvaRKuRhXGtXwRNLVjBan0Daq78
-----END PRIVATE KEY-----
`;


jwtRoute.post('/', function (req, res) {
    const payload = {
        sub: '1302',
        name: 'Tri Nguyen',
        exp: Math.floor(Date.now() / 1000) + (60 * 10)
    };

    try {
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        res.set('content-type', 'application/json');
        res.status(200);
        res.send(JSON.stringify({
            token: token
        }));
    } catch (e) {
        res.status(500);
        res.send(e.message);
    }
});

export default jwtRoute