var jwt = require("jsonwebtoken");


const generateToken=(userID)=>{
   const token= jwt.sign(
        { userID: userID },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "4d" }
      );
      return token
}


module.exports={
    generateToken,
}