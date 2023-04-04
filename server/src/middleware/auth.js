const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

  let cookie;
  let tokenCookie;
  let tokenPair;
  let token;

  const cookies = req.headers.cookie;

  if (cookies) {
    cookie = cookies.split('; ');
  }

  if (cookie) {
    tokenCookie = cookie.find(row => row.startsWith("token"));
  }

  if (tokenCookie) {
    tokenPair = tokenCookie.split('=');
  }

  if (tokenPair && tokenPair.length === 2) {
    token = tokenPair[1];
  }

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } 
  catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = verifyToken;