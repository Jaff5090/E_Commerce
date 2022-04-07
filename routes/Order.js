const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderCtrl");

//get all
router.get("/", orderController.get);
//get one
router.get("/:id", orderController.getOne);
//delte one
router.delete("/:id", orderController.delete);
//put order
router.put("/:id", orderController.updateorder);
//post order
router.post("/createorder", orderController.post);
module.exports = router;
