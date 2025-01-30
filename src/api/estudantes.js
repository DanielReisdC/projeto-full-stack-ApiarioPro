const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('estudantes!')
    })
    
module.exports = router