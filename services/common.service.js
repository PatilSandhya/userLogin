const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const createAccessToken = (sessionId) => {
    return jwt.sign({ sessionId, timestamp: Date.now() }, process.env.JWT_SECRET,{ algorithm: 'HS256' });
};

const verifyAccessToken = (token) => {
    let payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (payload) {
        return { success: true, data: payload };
    } else return { success: false };
};

const encryptPassword = (pass) => {
    return bcrypt.hashSync(pass, 15)
}

const comparePassword = (pass, hash) => {
    return bcrypt.compareSync(pass, hash)
}

module.exports ={
    verifyAccessToken,
    createAccessToken,
    encryptPassword,
    comparePassword
}