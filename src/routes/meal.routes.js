const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()  
const router = express.Router()
const logger = require('../util/logger')

const mealController = require('../controllers/meal.controller')
const authMiddleware = require('../middleware/auth.middleware')
const mealMiddleware = require('../middleware/meal.middleware')

//routes
//usecase 301
router.post('/meal',
    mealMiddleware.validateMealCreateMiddleware,
    authMiddleware.validateToken,
    mealController.create
)
//usecase 302
router.put('/meal/:mealid',
    mealMiddleware.validateMealUpdateMiddleware,
    authMiddleware.validateToken, 
    mealController.update
)
//usecase 303
router.get('/meal',
    authMiddleware.validateToken,
    mealController.getAll 
)
//usecase 304
router.get('/meal/:mealId',
    authMiddleware.validateToken,
    mealController.getById
)
//usecase 305
router.delete('/meal/:mealId',
    authMiddleware.validateToken,
    mealController.delete
)

module.exports = router