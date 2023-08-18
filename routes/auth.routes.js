const auth=require('../controllers/auth/authController');
const express= require('express');

const router=express.Router();



router.post('/user/login',auth.userLogin);
// router.post('/user/login/verify',auth.userLoginVerify);
router.post('/user/send-top',auth.sendOtp);
router.post('/user/verity-top',auth.checkOtp);
router.post('/user/verify/register',auth.userRegister);

// router.post('/users/register',auth.register);
// router.post('/users/register/verify',auth.verifyRegister);





module.exports=router;