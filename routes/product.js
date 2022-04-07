const express = require("express");
const router = express.Router();
const productController = require("../controllers/produitcontroller");

//get all
router.get("/", productController.get);
//get one
router.get("/:id", productController.getOne);
//delte one
router.delete("/:id", productController.delete);
//put produit
router.put("/:id", productController.updateproduct);
//post produit
router.post("/createproduit", productController.post);
module.exports = router;
