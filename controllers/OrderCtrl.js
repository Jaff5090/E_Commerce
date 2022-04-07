const order = require("../models/Order");

const orderCtrl = {
  get: async (req, res) => {
    try {
      const result = await order.find();
      res.send({ response: result, message: "getting orders " });
    } catch (error) {
      res.status(400).send({ message: "can not get orders" });
    }
  },
  getOne: async (req, res) => {
    try {
      const result = await order.findOne({ _id: req.params.id });
      if (!result) {
        return res
          .status(400)
          .send({ message: "there is no order with this id" });
      }
      res.send({ response: result, message: "getting order " });
    } catch (error) {
      res.status(400).send({ message: "there is no order with this id" });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await order.deleteOne({ _id: req.params.id });
      result.deletedCount == 1
        ? res.send({ response: "order deleted" })
        : res.send({ message: "there is no order with this id " });
    } catch (error) {
      res.status(400).send({ message: "there is no order with this id" });
    }
  },

  updateorder: async (req, res) => {
    try {
      const result = await order.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      result.modifiedCount = 1
        ? res.send({ message: "order updated" })
        : res.send({ message: "there is no order with this id " });
      res.send({ response: result, message: "getting order " });
    } catch (error) {
      console.log(error);
    }
  },
  post: async (req, res) => {
    try {
      const neworder = new order(req.body);
     
      const result = await neworder.save()
     
      res.send({ order: result });

    } catch (error) {
      res.send({ err: error });
    }
  },
};

module.exports = orderCtrl;
