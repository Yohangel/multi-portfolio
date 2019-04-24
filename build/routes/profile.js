"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var profile = require("../controllers/profile");
var router = express.Router();
exports.router = router;
router.put("/update", profile.updateProfile);
