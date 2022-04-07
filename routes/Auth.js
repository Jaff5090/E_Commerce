const express = require("express");
const router = express.Router();
const {loginRules,regiterRules,validation} = require('../middleware/Authvalidator');
const isAuth =require("../middleware/passsport");
const authCtrl = require('../controllers/authCtrl');
const userCtrl= require("../controllers/userCtrl");

//register
router.post("/register",regiterRules(),validation, authCtrl.register)
//login
router.post("/login",loginRules(),validation, authCtrl.login);
//current 
router.get("/current",isAuth(),authCtrl.current);

//get all
router.get("/",userCtrl.get);
//get one
router.get("/:id",userCtrl.getOne);
//delte one
router.delete("/:id",userCtrl.delete);
//put user
router.put("/:id",userCtrl.updateUser);





module.exports = router;