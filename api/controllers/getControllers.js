const UserDetails = require("../models/user")
const AdminDetails = require("../models/Admin")
const Product = require("../models/product")

const jwt = require("jsonwebtoken")

module.exports = {

     // -----------------Searching Available products--------------------

     async allAvailableProducts(req, res) {
        try {
            const products = await Product.find()
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await Product.find()
                .countDocuments({});
                return res.status(200).json({ count,products })
        }
        catch (error) {
            return res.status(500).send({error:error.message})
        }
    },
       // -----------------Searching product by id--------------------

       async searchProductById (req, res) { 
        try {
            const product = await Product.findOne({ _id: req.params.productid })
            console.log(product)
            return res.status(200).json({product})  
        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    },
        // --------------All Users List------------------------------------------------

        async allUsers(req,res) {
            try {
                const allUsers = await UserDetails.find()
                    .skip(((req.params.pagenumber) - 1) * 10)
                    .limit(10)
                    .sort({ createdAt: -1 });
                    const count = await UserDetails.find({})
                    .countDocuments({});
                    return res.status(200).json({ count,allUsers })
            } catch (error) {
                return res.status(500).send({error:error.message})
            }
        },
        // -----------------Filtering Available products--------------------

        async filterProducts(req, res) {
            try {
                if (!req.query) res.return({error:"Please enter a definite query to filter out jobs"})
                if (req.query.name) {
                    var products = await Product.find({ name: req.query.name })
                    .skip(((req.params.pagenumber) - 1) * 10)
                    .limit(10)
                    .sort({ createdAt: -1 });
                     const count = await Product.find({ name: req.query.name})
                    .countDocuments({});
                   return res.status(200).json({ count,products })
                 }

                if (req.query.freeDelivery) {
                    var products = await Product.find({ freeDelivery: req.query.freeDelivery })
                    .skip(((req.params.pagenumber) - 1) * 10)
                    .limit(10)
                    .sort({ createdAt: -1 });
                     const count = await Product.find({ freeDelivery: req.query.freeDelivery})
                    .countDocuments({});
                   return res.status(200).json({ count,products })
                 }

                if (req.query.seller) {
                    var products = await Product.find({ seller: req.query.seller })
                    .skip(((req.params.pagenumber) - 1) * 10)
                    .limit(10)
                    .sort({ createdAt: -1 });
                     const count = await Product.find({ seller: req.query.seller})
                    .countDocuments({});
                   return res.status(200).json({ count,products })
                 }
            
            
                }catch (error) {
                console.log(error)
                return res.status(500).send({error:error.message})
            }
        },     
        
        // ---------------------Account Activation (user)-----------------------

        async accountActivation(req, res) {
            try {
                if (!req.query.user) throw new Error("invalid route")
    
                
                if (!req.params.activationtoken) return res.status(401)
                const payload = await jwt.verify(req.params.activationtoken, process.env.TEMP_TOKEN_SECRET);
                if (payload) {
                    const updated = await UserDetails.findOneAndUpdate( {activationToken: req.params.activationtoken},{ isVerified: true, activationToken: null })               
                    if (updated) return res.status(202).send({message:"Account activated Successfully. Please visit Bigbuy.com and Login"});
                    return res.send({message:"Account already activated. Visit Bigbuy website to login into your Account"})
                }
                return res.send({error:"Invalid Token"})
            }
            catch (error) {
                console.log(error)
                res.status(500).send({error:error.message})
            }
        } ,

      
               
                
   

        




}