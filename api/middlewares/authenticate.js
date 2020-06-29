const UserDetails = require("../models/user")
const AdminDetails = require("../models/Admin")
const Product = require("../models/product")
const jwt = require("jsonwebtoken")


module.exports= {

    async  authenticateUsersToken(req, res, next) {
        try {
            const token = req.header('Authorization')
            if (!token) return res.sendStatus(401)
            const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log("PAYLOAD user = ", payload)
            if (!payload._id) {
                return res.sendStatus(403)
            }
            const user = await UserDetails.findOne({_id: payload._id, jwt: token})
            console.log(user)
            if(!user) return res.sendStatus(401)
            if (user.isBlocked) return res.status(401).send(`${user.name}, you are blocked for the misuse of BigBuy.com.....`);
            req.user = user
            next()
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    async authenticateAdminsToken (req,res,next){
        try {
            const token = req.header('Authorization')
            if (!token) return res.sendStatus(401)
            const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log("PAYLOAD Seeker = ", payload)
            if (!payload._id) {
                return res.sendStatus(403)
            }
            const admin = await AdminDetails.findOne({_id: payload._id, jwt: token})
           
            if(!admin) return res.sendStatus(401)
            if (admin.isBlocked) return res.status(401).send(`${admin.name}, you are blocked for the misuse of BigBuy.com.....`);
            req.admin = admin
            next()
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }

}