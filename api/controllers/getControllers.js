import UserDetails from "../models/user";
import AdminDetails from "../models/Admin";
import Product from "../models/product";
import orders from "../models/order";
import jwt from "jsonwebtoken";

export default {
  // -----------------Searching Available products--------------------

  async allAvailableProducts({ params }, res) {
    try {
      const products = await Product.find()
        .skip((params.pagenumber - 1) * 10)
        .limit(10)
        .sort({ createdAt: -1 });
      const count = await Product.find().countDocuments({});
      return res.status(200).json({ count, products });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  // -----------------Searching product by id--------------------

  async searchProductById({ params }, res) {
    try {
      const product = await Product.findOne({ _id: params.productid });
      console.log(product);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  // --------------All Users List------------------------------------------------

  async allUsers({ params }, res) {
    try {
      const allUsers = await UserDetails.find()
        .skip((params.pagenumber - 1) * 10)
        .limit(10)
        .sort({ createdAt: -1 });
      const count = await UserDetails.find({}).countDocuments({});
      return res.status(200).json({ count, allUsers });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  // -----------------Filtering Available products--------------------

  async filterProducts({ query, params }, res) {
    try {
      if (!query)
        res.return({
          error: "Please enter a definite query to filter out jobs",
        });
      if (query.name) {
        var products = await Product.find({ name: query.name })
          .skip((params.pagenumber - 1) * 10)
          .limit(10)
          .sort({ createdAt: -1 });
        const count = await Product.find({ name: query.name }).countDocuments(
          {}
        );
        return res.status(200).json({ count, products });
      }

      if (query.freeDelivery) {
        var products = await Product.find({ freeDelivery: query.freeDelivery })
          .skip((params.pagenumber - 1) * 10)
          .limit(10)
          .sort({ createdAt: -1 });
        const count = await Product.find({
          freeDelivery: query.freeDelivery,
        }).countDocuments({});
        return res.status(200).json({ count, products });
      }

      if (query.seller) {
        var products = await Product.find({ seller: query.seller })
          .skip((params.pagenumber - 1) * 10)
          .limit(10)
          .sort({ createdAt: -1 });
        const count = await Product.find({
          seller: query.seller,
        }).countDocuments({});
        return res.status(200).json({ count, products });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  // ---------------------Account Activation (user)-----------------------

  async accountActivation({ query, params }, res) {
    try {
      if (!query.user) throw new Error("invalid route");

      if (!params.activationtoken) return res.status(401);
      const payload = await jwt.verify(
        params.activationtoken,
        process.env.TEMP_TOKEN_SECRET
      );
      if (payload) {
        const updated = await UserDetails.findOneAndUpdate(
          { activationToken: params.activationtoken },
          { isVerified: true, activationToken: null }
        );
        if (updated)
          return res.status(202).send({
            message:
              "Account activated Successfully. Please visit Bigbuy.com and Login",
          });
        return res.send({
          message:
            "Account already activated. Visit Bigbuy website to login into your Account",
        });
      }
      return res.send({ error: "Invalid Token" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  cart(req, res) {
    const user = req.user._id;
    UserDetails.findOne({ _id: user }).then(({ _id }) => {
      id = _id;
      orders.find({ userId: id }).then((prod) => {
        console.log(prod);
        res.send({ order: prod });
      });
    });
  },
};
