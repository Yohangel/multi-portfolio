import jwt = require("jsonwebtoken");
const data = {
  PORT: 3000,
  URL: "/api",
  SECRET: "th1s_notk3i_",
  TOKEN_OPTIONS: {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  }
};

function initDb() {
  var mongoose = require("mongoose");
  const DB = "mongodb://localhost:27017/portfolio";
  let response = false;

  mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    response = true;
    console.log("Connected to DB");
  });
  return response;
}

function getTokenData(req) {
  return new Promise((resolve, reject) => {
    const token = getToken(req);
    if (!token) reject(false);
    jwt.verify(token, data.SECRET, function(err, decoded) {
      if (err) return reject(false);
      resolve(decoded);
    });
  });
}

const getToken = function fromHeaderOrQuerystring(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

export { data, initDb, getTokenData };
