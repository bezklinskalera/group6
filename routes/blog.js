const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/temp',(req,res)=>{
  res.render('template');
});


module.exports = router;