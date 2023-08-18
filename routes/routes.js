const express = require('express');

const {courseController,videoController} = require('../controllers');
// const Course = require('../models/course');
const router = express.Router();


router.get('/course-list', courseController.courseList);
router.post('/course-by-id', courseController.courseById);
router.post('/course-wise-video', videoController.courseWiseVideo);
// router.post('/course-category', courseController.courseById);
module.exports = router;