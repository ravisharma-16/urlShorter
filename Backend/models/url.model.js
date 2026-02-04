import mongoose from "mongoose";

const urlschema = new mongoose.Schema({
    originalUrl :
    {
        type : String,
        required : true,
    },
     shortId: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
},{timestamps : true});

export const urlmodel = mongoose.model("urlmodel", urlschema);