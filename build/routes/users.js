"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var users = require("../controllers/user");
var router = express.Router();
exports.router = router;
router.get("/u/:user", users.getUser);
router.post("/create", users.createUser);
router.post("/login", users.loginUser);
