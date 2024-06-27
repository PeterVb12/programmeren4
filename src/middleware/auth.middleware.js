const chai = require('chai')
chai.should()
const assert = require('assert')
const jwt = require('../util/jwt')
const jwtSecretKey = require('../util/config').secretkey
const logger = require('../util/logger')

const authMiddleware = {
    validateToken: async (req, res, next) => {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            logger.error('Not logged in') // Log error
            return next({
                status: 401,
                message: 'Not logged in',
                data: {}
            })
        }

        if (!authHeader.startsWith('Bearer ')) {
            logger.error('Not valid token') // Log error
            return next({
                status: 401,
                message: 'Not valid token',
                data: {}
            })
        }

        // Strip the word 'Bearer ' from the header value
        const token = authHeader.substring(7, authHeader.length)

        try {
            const payload = await jwt.verify(token, jwtSecretKey)
            /**
             * User heeft toegang.
             * BELANGRIJK! Voeg UserId uit payload toe aan request,
             * zodat die voor ieder volgend endpoint beschikbaar is.
             * Je hebt dan altijd toegang tot de userId van de ingelogde gebruiker.
             */
            req.userId = payload.userId
            next()
        } catch (err) {
            logger.error('Not valid token', err) // Log error with details
            next({
                status: 401,
                message: 'Not valid token',
                error: err,
                data: {}
            })
        }
    },

    validateLogin: (req, res, next) => {
        const { emailAdress, password } = req.body

        if (!emailAdress || !password) {
            logger.error('Missing required fields.') // Log error
            return res.status(400).json({
                status: 400,
                message: 'Missing required fields.',
                data: {}
            })
        }

        if (typeof emailAdress !== 'string' || typeof password !== 'string') {
            logger.error('Email address and password must be strings.') // Log error
            return res.status(400).json({
                status: 400,
                message: 'Email address and password must be strings.',
                data: {}
            })
        }

        if (!validateEmail(emailAdress)) {
            logger.error('Invalid emailadress format') // Log error
            return res.status(400).json({
                status: 400,
                message: 'Invalid emailadress format',
                data: {}
            })
        }

        if (!validatePassword(password)) {
            logger.error('Invalid password format.') // Log error
            return res.status(400).json({
                status: 400,
                message: 'Invalid password format.',
                data: {}
            })
        }

        next()
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
}

module.exports = authMiddleware
