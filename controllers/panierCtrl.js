const panier = require("../models/Panier");

const panierController = {
  get: async (req, res) => {
    try {
      const result = await panier.find();
      res.send({ response: result, message: "getting paniers " });
    } catch (error) {
      res.status(400).send({ message: "can not get paniers", error });
    }
  },
  getOne: async (req, res) => {
    try {
      const result = await panier.findOne({ _id: req.params.id })
      if (!result) {
        return res
          .status(400)
          .send({ message: "there is no panier with this id" });
      }
      res.send({ response: result, message: "getting panier " });
    } catch (error) {
      res.status(400).send({ message: "there is no panier with this id" });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await panier.deleteOne({ _id: req.params.id });
      result.deletedCount == 1
        ? res.send({ response: "panier deleted" })
        : res.send({ message: "there is no panier with this id " });
    } catch (error) {
      res.status(400).send({ message: "there is no panier with this id" });
    }
  },

  updatepanier: async (req, res) => {
    try {
      const result = await panier.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      result.modifiedCount = 1
        ? res.send({ message: "panier updated" })
        : res.send({ message: "there is no panier with this id " });
      res.send({ response: result, message: "getting panier " });
    } catch (error) {
      console.log(error);
    }
  },
  post: async (req, res) => {
    try {
      const newpanier = new panier(req.body);

      const result = await newpanier.save();
      res.send({ panier: result });
    } catch (error) {
      res.send({ err: error });
    }
  },
};

module.exports = panierController;
