import Products from "../models/product";
import UserDetails from "../models/user";
import AdminDetails from "../models/Admin";
import Product from "../models/product";
import cloudinary from "../utils/cloudinary";
import convertBufferToString from "../utils/convertBufferToString";
import { hash } from "bcryptjs";

export default {
  // ----------------------------------------Admin Blocking User-----------------------------------------------
  async blocking({ query }, res) {
    try {
      const update = await UserDetails.findOneAndUpdate(
        { _id: query.userid, isBlocked: false },
        { isBlocked: true }
      );
      if (!update) return res.send({ error: "user blocked already" });
      return res.status(202).send({ message: "User Blocked Succesfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
  // ----------------------------------------Admin Blocking User-----------------------------------------------
  async unblocking({ query }, res) {
    try {
      const update = await UserDetails.findOneAndUpdate(
        { _id: query.userid, isBlocked: true },
        { isBlocked: false }
      );
      if (!update) return res.send({ error: "user unblocked already" });
      return res.status(202).send({ message: "User unBlocked Succesfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  }, // -------------------Updating product details---------------

  async updatingProduct({ query, body }, res) {
    try {
      await Product.findOneAndUpdate({ _id: query.productid }, { ...body });
      return res.status(202).send({ message: "product updated successfully" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // ---------------------------Uploading Profile-Picture (user)-----------
  async uploadProfilePicture(req, res) {
    try {
      const user = req.user;

      let imageContent = convertBufferToString(
        req.file.originalname,
        req.file.buffer
      );
      let imageResponse = await cloudinary.uploader.upload(imageContent);
      await UserDetails.findOneAndUpdate(
        { _id: user._id },
        { profilePicture: imageResponse.secure_url }
      );

      res
        .status(202)
        .send({ message: "uploaded Profile picture successfully" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // ---------------------------Changing Password (user)-----------
  async editPassword(req, res) {
    try {
      const user = req.user;

      const hashedPassword = await hash(req.body.password, 10);
      console.log("hashed=", hashedPassword);
      console.log("user=", user);
      await UserDetails.update({ _id: user._id }, { password: hashedPassword });
      return res.status(202).send({ message: "Password changed successfully" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};
