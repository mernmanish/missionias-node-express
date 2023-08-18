const User = require("../models/user");
const UserOtp = require("../models/userOtp")

const generateOtp = async (mobile) => {
    //const otp = Math.floor(100000 + Math.random() * 900000);
    const otp = "123456";
    const user = await UserOtp.findOne({ where: { mobile: mobile } })
    //twilioSms
    // const accountSid = "AC2eacb2cd3e5c6560b778bada4a61d580";
    // const authToken = "c2c5cdc83665bebda9c38fde2362c894";
    // const client = require("twilio")(accountSid, authToken);

    // client.messages
    // .create({ body: ""+otp+" is the OTP for your Agriculture Protest account.", from: "+13202686587", to: "+91"+mobile+"" })
    // .then(message => console.log(message.sid));
        if (!user) {
            const data = await UserOtp.create({ mobile: mobile, otp: otp });
            return data;
        }
        else {
            const data = await UserOtp.update({ mobile, otp }, { where: { mobile, mobile } });
            return data;
        }
    }

const verifyOtp = async (mobile, otp) => {
    return UserOtp.findOne({ where: { mobile: mobile, otp: otp } })
}

module.exports = {
    generateOtp,
    verifyOtp,
}


