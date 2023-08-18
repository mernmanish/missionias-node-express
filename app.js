const dotenv=require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const cors =require('cors');
const passport = require("passport");
const moment = require("moment");
const { Op } = require("sequelize");
app.use(cors());
app.use(express.json());
const apiRouter=require('./routes/routes');
const authRouter=require('./routes/auth.routes');
const { auth } = require('./middleware/passportAuth');

//passport-jwt
  auth();
app.use(passport.initialize());
app.use(express.urlencoded({
    extended: true
}));

// const options = {
//     definition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'Ecommerce API',
//         version: '1.0.0',
//         description:'API-Docs for Ecommerce'
//       },
//       servers:[
//         {
//         url:"http://localhost:9090/",
//       },
//       {
//         url:"",
//       }
//     ],
//     components:{
//     securitySchemes:{
//       BearerAuth:{
//         type: 'http',
//         scheme: 'bearer'
//       },
//     },
//     },
//     },
//     schemes:['http','https'],
//   };
  
  // app.use(function(req, res) {
  //   res.status(404);
  //   if (req.accepts('json')) {
  //     res.json({ error: 'Not founds' });
  //     return;
  //   }
  // });

  app.get('/', async (req, resp) => {
    resp.send('welcome to Mission IAS API')
})
app.use('/api',passport.authenticate("jwt",{session:false}));
app.use('/auth',authRouter);
app.use('/api',apiRouter);

const PORT = 9090
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})