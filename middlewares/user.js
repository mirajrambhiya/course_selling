const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_USER_SECRET

function userMiddleware(req, res, next){
    const token = req.headers.token;

    try{
        const response = jwt.verify(token, JWT_SECRET);
        req.userid = response.id;
        next();
    }
    catch(e){
        res.status(401).json({
            message: "Authentication failed"
        })
    }
}

module.exports = userMiddleware;