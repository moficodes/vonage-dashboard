import { v1 as uuidv1 } from 'uuid';
import jwt from 'jsonwebtoken';


function generateToken(privateKey, applicationId) {
    var data = {
        iat: parseInt(Date.now() / 1000, 10),
        exp: parseInt(Date.now() / 1000, 10) + 3600,
        jti: uuidv1(),
        application_id: applicationId,
    }
    var token = jwt.sign(data, privateKey, { algorithm: 'RS256' });
    return token;
}

export default generateToken;