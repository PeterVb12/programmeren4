
const assert = require('assert')
const jwt = require('jsonwebtoken')
const jwtSecretKey = require('../util/config').secretkey
const routes = require('express').Router()

const AuthController = require('../controllers/authentication.controller')
const authMiddleware = require('../middleware/auth.middleware')

const logger = require('../util/logger')
const express = require('express')
const router = express.Router()

//use case 101
routes.post('/login', 
    authMiddleware.validateLogin, 
    AuthController.login)

module.exports = routes