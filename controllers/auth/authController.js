const { STATUSES } = require("../../config/constants");
var jwt = require("jsonwebtoken");
const Joi = require('joi');
const { Op } = require('sequelize');
const md5 = require('md5');
const User = require("../../models/user");
const { generateToken } = require('../../utils/functions');
const {
    generateOtp,
    verifyOtp
} = require('../common');
const sendOtp = async (req, resp) => {
    const {
        mobile
    } = req.body;



    const schema = Joi.object({
        mobile: Joi.number().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        resp.status(400).send(error.details[0].message);
        console.log(error.details[0].message)
        return;
    }



    try {
        const userExist = await User.findOne({
            where: {
                mobile : mobile,

            }
        });
        if (userExist) {
            resp.send({
                status: STATUSES.FAILED,
                message: 'user already exist',
            });
        } else {
            await generateOtp(mobile);
            resp.status(201).send({
                status: STATUSES.SUCCESS,
                message: 'otp sent successfully'
            })

        }

    } catch (error) {
        resp.status(500).send({ status: STATUSES.FAILED, message: error.message })
    }
}
const checkOtp = async(req,res) => {
    const {
        mobile,
        otp
    } = req.body;


    try {
        const userOtp = await verifyOtp(mobile, otp);
        if (userOtp) {

            res.status(200).send({
                status: STATUSES.SUCCESS,
                message: 'otp verified',
            })
        }
        else {
            res.send({ status: STATUSES.FAILED, message: 'invalid otp' });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: STATUSES.FAILED, message: error.message });
    }
 };
const userRegister = async(req,res)=>{
    const {
        name,
        email,
        mobile,
        fcm_token,
        city,
        password
    } = req.body
    const schema = Joi.object({
        name: Joi.string().required(),
        email:Joi.string().required(),
        mobile: Joi.number().required(),
        password: Joi.string().required(),
        city: Joi.string().required().optional().allow(),
        fcm_token: Joi.string().required().optional().allow(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        console.log(error.details[0].message)
        return;
    }
    try{
        const checkUser = await User.findOne({where:{mobile:mobile}});
        if(checkUser){
            res.status(302).send({
                status: 'false',
                message: 'Mobile No Already Register',
            });
        }
        else{
        const userData = await User.create({
            name: name,
            email: email,
            mobile: mobile,
            password: md5(password),
            fcm_token:fcm_token,
            city:city
        })
    //    console.log(userData);
        if (userData) {
            let user = await User.findOne({ where: { mobile: mobile }, attributes: { exclude: 'password' } });
            const token = jwt.sign(
                { userID: user.id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "365d" }
            );
            user.api_token = token;
            await user.save();
            res.status(200).send({
                status: 'success',
                message: 'Customer Registered Successfully',
                data: user,
            });
        }
    }
    }
    catch(error)
    {
        res.status(500).send({ status: STATUSES.FAILED, message: error.message })
    }

}

 const userLogin = async(req,resp)=>{
    const {
        mobile,
        password
    } = req.body;
    const schema = Joi.object({
        mobile: Joi.number().required(),
        password: Joi.string().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        resp.status(400).send(error.details[0].message);
        console.log(error.details[0].message)
        return;
    }
    try {
        const checkData = await User.findOne({
            where: {
                mobile : mobile,
                password: md5(password)
            }
        });
        if (checkData) {
            let user = await User.findOne({ where: { mobile: mobile }, attributes: { exclude: 'password' } });
            const token = jwt.sign(
                { userID: user.id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "365d" }
            );
            user.api_token = token;
            await user.save();
            resp.status(200).send({
                status: 'success',
                data: user,
            });
            // resp.status(201).send({
            //     status: STATUSES.SUCCESS,
            //     message: 'otp sent successfully'
            // })
        } else {
            resp.status(403).send({
                status: STATUSES.FAILED,
                message: 'user not exist',
            });
        }
        // const checkData = await User.findOne({
        //     where: {
        //         mobile: mobile,
        //         usertype:"customer"
        //     }
        // });
        // if (checkData) {
        //     let user = await User.findOne({ where: { mobile: mobile }, attributes: { exclude: 'password' } });
        //     const token = jwt.sign(
        //         { userID: user.id },
        //         process.env.JWT_SECRET_KEY,
        //         { expiresIn: "365d" }
        //     );
        //     user.api_token = token;
        //     await user.save();
        //     resp.status(200).send({
        //         status: 'success',
        //         data: user,
        //     });
        // } else {
        //     resp.status(404).send({
        //         status: STATUSES.FAILED,
        //         message: 'Customer not exist'
        //     })

        // }

    } catch (error) {
        resp.status(500).send({ status: STATUSES.FAILED, message: error.message })
    }
 }

 const userLoginVerify = async(req,res) => {
    const {
        mobile,
        otp
    } = req.body;
    try {
        const userOtp = await verifyOtp(mobile, otp);
        if (userOtp) {
            let user = await User.findOne({ where: { mobile: mobile }, attributes: { exclude: 'password' } });
            const token = jwt.sign(
                { userID: user.id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "365d" }
            );
            user.api_token = token;
            await user.save();
            res.status(200).send({
                status: STATUSES.SUCCESS,
                message: 'otp verified',
                data: user,
            });
        }
        else {
            res.send({ status: STATUSES.FAILED, message: 'invalid otp' });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: STATUSES.FAILED, message: error.message });
    }
 }

//  const cityVerification = async(req,res) => {
//     const { city,user_id } = req.body;
//     try{
//         const getCity = await City.findAll({ where: { name: { [Op.like]:city } } });
//         if(getCity.length > 0)
//         {
//           const data = {
//             'city_id': getCity[0].id,
//             'user_id': user_id
//           };
//           await UserCity.create(data);
//           res.status(200).send({ status: STATUSES.SUCCESS,message: "Service Available in your City" })
//         }
//         else
//         {
//             res.status(404).send({ status: STATUSES.FAILED,message: "Sorry, service not Available in City" })
//         }
//     }
//     catch(error)
//     {
//         res.status(500).send({status: STATUSES.FAILED,message:error.message});
//     }
//  }

//   const userDetails=async(req,resp)=>{
//     const user=await User.findAll({
//     });
//         resp.status(200).send({ status:STATUSES.SUCCESS,data:user});

//    }

   module.exports={
    sendOtp,
    checkOtp,
    userRegister,
    userLogin,
    // // cityVerification,
    // userLoginVerify
   }