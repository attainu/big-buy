const UserDetails = require("../models/user")
const AdminDetails = require("../models/Admin")
const Product = require("../models/product")
const Orders =require("../models/order")
module.exports={
    async userLogout(req, res) {
// ----------------------Logout from Account (user)------------------------

        try {
            var user = req.user;
            await UserDetails.findOneAndUpdate({ _id: user._id }, { jwt: null })
            return res.status(202).send({message:"You are successfully logged out from your Account. We hope you visit again"});
        } catch (error) {
            res.status(404).send({error:error.message})
        }
    },
    async adminLogout(req, res) {
        // ----------------------Logout from Account (user)------------------------
        
                try {
                    var admin = req.admin;
                    await AdminDetails.findOneAndUpdate({ _id: admin._id }, { jwt: null })
                    return res.status(202).send({message:"You are successfully logged out from your Account. We hope you visit again"});
                } catch (error) {
                    res.status(404).send({error:error.message})
                }
            },

    async deleteProduct(req, res) {

        //---------------------------deleting a product--------------------------

                try {
                    const deleted = await Product.findOneAndDelete({_id:req.query.productid});
                    if(!deleted) return res.send({error:'product doesnt exist'})
                    return res.status(202).send({message:"product deleted succesfully"});
                }catch(error){
                    res.status(404).send({error:error.message});
                }

    },
    async deleteOrder(req, res) {

        //---------------------------deleting a product--------------------------

                try {
                    const deleted = await Orders.findOneAndDelete({_id:req.query.orderid});
                    if(!deleted) return res.send({error:'product doesnt exist'})
                    return res.status(202).send({message:"product deleted succesfully"});
                }catch(error){
                    res.status(404).send({error:error.message});
                }


            }


    


}