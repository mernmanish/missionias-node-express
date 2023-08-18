const { STATUSES } = require('../config/constants');
const sequelize = require('sequelize');
const arrPluck = require('arr-pluck');
const Joi = require('joi');

const Course = require('../models/course');
const CourseType = require('../models/courseType');

const courseList= async (req,res) =>{
    try{
        const course = await Course.findAll({
            where:{
                status:1
            },
            include:[
            {
                model: CourseType,
                as: 'type',
                attributes:['course_type','status']
            }
            ]
        });
        if(course.length > 0)
        {
            res.status(200).send({
            status:STATUSES.SUCCESS,
            data: course
            })
        }
        else{
            res.status(302).send({
                status:STATUSES.FAILED,
                message:"course not found"
            })
        }
    }
    catch(error){
        res.status(500).send({status:STATUSES.FAILED,message:error.message});
    }
}

const courseById = async(req,res) => {
    const {
        course_id
    } = req.body;
    const schema = Joi.object({
        course_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        console.log(error.details[0].message)
        return;
    }
    try{
        const course = await Course.findOne({
            where:{
                status:1,
                id:course_id
            },
            include:[
            {
                model: CourseType,
                as: 'type',
                attributes:['course_type','status']
            }
            ]
        });
        if(course)
        {
            res.status(200).send({
            status:STATUSES.SUCCESS,
            data: course
            })
        }
        else{
            res.status(302).send({
                status:STATUSES.FAILED,
                message:"course not found"
            })
        }
    }
    catch(error)
    {
        res.status(500).send({status:STATUSES.FAILED,message:error.message});
    }
}

module.exports = {
    courseList,
    courseById
}