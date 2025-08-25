const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_ADMIN_SECRET

function adminMiddleware(req, res, next){
    const token = req.headers.token;

    try{
        const response = jwt.verify(token, JWT_SECRET);
        req.adminid = response.id;
        next();
    }
    catch(e){
        res.status(401).json({
            message: "Authentication failed"
        })
    }
}

module.exports = adminMiddleware;