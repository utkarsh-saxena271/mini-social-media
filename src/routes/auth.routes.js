const express = require("express");
const router = express.Router();
const {registerController,loginController} = require('../controllers/auth.controller')

// POST /api/auth/register
// POST /api/auth/login
// GET /api/auth /user[protected]

 
router.post('/register',registerController)
router.post('/login',loginController)
 


module.exports = router;