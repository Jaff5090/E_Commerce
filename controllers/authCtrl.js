const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const authCtrl = {
  register: async (req, res) => {
    const { name, lastName, email, password, isAdmin } = req.body;
    try {
      const newUser = new User({ name, lastName, email, password, isAdmin });
      //cript pwd
      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const hashedPassword = await bcrypt.hash(password, genSalt);
      newUser.password = hashedPassword;

      // check if the email exist
      const searchedUser = await User.findOne({ email });

      if (searchedUser) {
        return res.status(400).send({ message: "email already exist" });
      }

      //save user

      await newUser.save();
      //genreate a token
      const paylod = {
        _id: newUser._id,
      };
      const token = await jwt.sign(paylod, process.env.SecretOrKey);
      res.send({ newUser, message: "user is saved", token: `Bearer ${token}` });
    } catch (error) {
      res.status(500).send({ msg: "cannot save the user", err: error });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      //find if the user exist
      const shearchedUser = await User.findOne({ email });
      // if the email not exist
      if (!shearchedUser)
        return res.status(400).send({ message: "email or password invalid" });
      //Pwd are equals
      const match = await bcrypt.compare(password, shearchedUser.password);
      if (!match) {
        return res.status(400).send({ message: "email or password invalid" });
      }

      //create token
      const paylod = {
        _id: shearchedUser._id,
      };
      const token = await jwt.sign(paylod, process.env.SecretOrKey);

      //send user
      res.status(200).send({
        user: shearchedUser,
        message: "user login with success",
        token: `Bearer ${token}`,
      });
    } catch (error) {
     res.status(500).send("cannot get the user");
    }
  },
  current: (req, res) => { // utilisateur deja connécté (token)
    
     res.status(200).send(req.user);
  },
  
};
module.exports = authCtrl;

