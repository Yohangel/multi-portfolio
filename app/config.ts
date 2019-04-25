import jwt = require("jsonwebtoken");
const colors = require("colors");

const serverMessage = {
  INIT: `
   _____         _   ___     _ _        _____     _ _   _                 
  |  _  |___ ___| |_|  _|___| |_|___   |     |_ _| | |_|_|_ _ ___ ___ ___ 
  |   __| . |  _|  _|  _| . | | | . |  | | | | | | |  _| | | |_ -| -_|  _|
  |__|  |___|_| |_| |_| |___|_|_|___|  |_|_|_|___|_|_| |_|___|___|___|_| v1.0 
                                                                        
  By: Yohangel Ramos
  ` // rectangles AsciiSignature
};
const data = {
  PORT: process.env.PORT || 5000,
  URL: "/api",
  SECRET: "th1s_notk3i_",
  TOKEN_OPTIONS: {
    expiresIn: 60 * 60 * 24 // expires in 24 hour
  }
};

function initDb() {
  var mongoose = require("mongoose");
  const DB =
    "mongodb://ad1m:xd8zvq7b4E4ZX4b@ds147436.mlab.com:47436/heroku_9f5227q3";
  let response = false;

  mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  // @ts-ignore
  db.on("error", console.error.bind(console, " error de conexión:".red));
  db.once("open", function() {
    response = true;
    // @ts-ignore
    console.log(" Conectado a la DB".green);
  });
  return response;
}

function getTokenData(req: any) {
  return new Promise((resolve, reject) => {
    const token = getToken(req);
    if (!token) reject(false);
    jwt.verify(token, data.SECRET, function(err: any, decoded: any) {
      if (err) return reject(false);
      resolve(decoded);
    });
  });
}

const getToken = function fromHeaderOrQuerystring(req: any) {
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

export { data, initDb, getTokenData, serverMessage };
