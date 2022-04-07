const express = require("express");
const router = express.Router();
const panierController = require("../controllers/panierCtrl");

//get all
router.get("/", panierController.get);
//get one
router.get("/:id", panierController.getOne);
//delte one
router.delete("/:id", panierController.delete);
//put panier
router.put("/:id", panierController.updatepanier);
//post panier
router.post("/createpanier", panierController.post);
module.exports = router;
