import UserDetails from "../models/user";
import AdminDetails from "../models/Admin";
import Product from "../models/product";
import Order from "../models/order";


// ----------------------Logout from Account (user)------------------------
export const userLogout = async (req, res) => {
  try {
    const user = req.user;
    await UserDetails.findOneAndUpdate({ _id: user._id }, { jwt: null });
    return res.status(202).send({
      message:
        "You are successfully logged out from your Account. We hope you visit again",
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

// ----------------------Logout from Account (user)------------------------
export const adminLogout = async (req, res) => {
  try {
    const admin = req.admin;
    await AdminDetails.findOneAndUpdate({ _id: admin._id }, { jwt: null });
    return res.status(202).send({
      message:
        "You are successfully logged out from your Account. We hope you visit again",
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//---------------------------deleting a product--------------------------
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.query.productid,
    });
    if (!deleted) return res.send({ error: "product doesnt exist" });
    return res.status(202).send({ message: "product deleted succesfully" });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const deleteOrder = async (req, res) =>{

  //---------------------------deleting an order--------------------------

          try {
              const deleted = await Order.findOneAndDelete({_id:req.query.orderid});
              if(!deleted) return res.send({error:'product doesnt exist'})
              return res.status(202).send({message:"product deleted succesfully"});
          }catch(error){
              res.status(404).send({error:error.message});
          }


      }
