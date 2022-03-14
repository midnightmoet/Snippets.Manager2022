const jwt = require("jsonwebtoken");

function auth(req, res, next){
    try {
        const token = req.cookies.token;
        if(!token) res.status(401).json({errorMessage: "Unauthorized"});

        const validatedUser = jwt.verify(process.env.JWT_SECRET);
        req.user = validatedUser.id;

        next();
    } catch (error){
        res.status(401).json({ errorMessage: "Unauthorized." });
    }

    
}

module.exports = auth;