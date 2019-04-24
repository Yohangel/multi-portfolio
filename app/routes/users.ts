import express = require("express");
import jwt = require("jsonwebtoken");
import config = require("../config");

const users = require("../controllers/user");
const router = express.Router();

router.get("/u/:user", users.getUser);
router.post("/create", users.createUser);
router.post("/login", users.loginUser);

export { router };
