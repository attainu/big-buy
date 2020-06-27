import UserDetails from "../models/user";
import AdminDetails from "../models/Admin";
import Product from "../models/product";
import Orders from "../models/order";

export default {
  async userLogout(req, res) {
    // ----------------------Logout from Account (user)------------------------

    try {
      const user = req.user;
      await UserDetails.findOneAndUpdate({ _id: user._id }, { jwt: null });
      return res
        .status(202)
        .send({
          message:
            "You are successfully logged out from your Account. We hope you visit again",
        });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },
  async adminLogout(req, res) {
    // ----------------------Logout from Account (user)------------------------

    try {
      const admin = req.admin;
      await AdminDetails.findOneAndUpdate({ _id: admin._id }, { jwt: null });
      return res
        .status(202)
        .send({
          message:
            "You are successfully logged out from your Account. We hope you visit again",
        });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },

  async deleteProduct({ query }, res) {
    //---------------------------deleting a product--------------------------

    try {
      const deleted = await Product.findOneAndDelete({ _id: query.productid });
      if (!deleted) return res.send({ error: "product doesnt exist" });
      return res.status(202).send({ message: "product deleted succesfully" });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },
  async deleteOrder({ query }, res) {
    //---------------------------deleting a product--------------------------

    try {
      const deleted = await Orders.findOneAndDelete({ _id: query.orderid });
      if (!deleted) return res.send({ error: "product doesnt exist" });
      return res.status(202).send({ message: "product deleted succesfully" });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },
};
