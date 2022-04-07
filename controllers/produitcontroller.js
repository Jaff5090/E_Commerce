const product = require("../models/produit");

const productController = {
  get: async (req, res) => {
    try {
      const result = await product.find();
      res.send({ response: result, message: "getting products " });
    } catch (error) {
      res.status(400).send({ message: "can not get products" });
    }
  },
  getOne: async (req, res) => {
    try {
      const result = await product
        .findOne({ _id: req.params.id });
      if (!result) {
        return res
          .status(400)
          .send({ message: "there is no product with this id" });
      }
      res.send({ response: result, message: "getting product " });
    } catch (error) {
      res.status(400).send({ message: "there is no product with this id" });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await product.deleteOne({ _id: req.params.id });
      result.deletedCount == 1
        ? res.send({ response: "product deleted" })
        : res.send({ message: "there is no product with this id " });
    } catch (error) {
      res.status(400).send({ message: "there is no product with this id" });
    }
  },

  updateproduct: async (req, res) => {
    try {
      const result = await product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      result.modifiedCount = 1
        ? res.send({ message: "product updated" })
        : res.send({ message: "there is no product with this id " });
      res.send({ response: result, message: "getting product " });
    } catch (error) {
      console.log(error);
    }
  },
  post: async (req, res) => {
    try {
      const newproduct = new product(req.body);

      const result = await newproduct.save();
      res.send({ product: result });
    } catch (error) {
      res.send({ err: error });
    }
  },
};

module.exports = productController;
