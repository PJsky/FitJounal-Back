const jwt = require('jsonwebtoken');

module.exports = function getUser(token){
    const decodedToken = jwt.decode(token);
    const userId = decodedToken["_id"];   
    return userId;
}