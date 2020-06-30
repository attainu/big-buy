const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    jwt:{
      type:String,
      default:null
    },
    activationToken:{
      type:String,
      required:false
      },
    isVerified:{
      type:Boolean,
      default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    orders: [
      {
        type: Object
      }
    ]
  

  
}, { timestamps: true })

const UserDetails = mongoose.model("userDetail", userSchema)
module.exports=UserDetails;