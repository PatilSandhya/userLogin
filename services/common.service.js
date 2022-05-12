const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createAccessToken = (sessionId) => {
    return jwt.sign(
        {
            sessionId,
            timestamp: Date.now()
        },
        process.env.JWT_SECRET,
        { algorithm: 'HS256' }
    );
};

const verifyAccessToken = (token) => {
    let payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (payload) {
        return { success: true, data: payload };
    } else return { success: false };
};


module.exports ={
    verifyAccessToken,
    createAccessToken
}