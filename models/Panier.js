const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    
    products: [
      {
        product: {
          id:{type:String},
          title: { type: String },
          img: { type: String },
          size: { type: String },
          color: { type: String },
          price: { type: Number },
          
        },
        quantity: {
          type: Number,
          default: 1,
        },
        
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
