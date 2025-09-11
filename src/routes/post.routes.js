const express = require('express');
const router = express.Router();

// POST /api/posts[protected]
router.post('/post',async (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message : 'Unauthorised access, please login first '
        })
    }
});


module.exports = router