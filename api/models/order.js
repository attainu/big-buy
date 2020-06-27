import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "userDetail",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const Order = mongoose.model("order", orderSchema);
export default Order;
