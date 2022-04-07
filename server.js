console.clear(); //nettoyage des 
const express = require("express"); // routes (get , post , delete , update ..)
const connectDB = require("./config/connectDB"); // 
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
//connect DB
connectDB();
//routes
app.use(express.json());
app.use("/user", require("./routes/Auth"));
app.use("/panier", require("./routes/Panier"));
app.use("/order", require("./routes/Order"));
app.use("/produit", require("./routes/product"));
const PORT = process.env.PORT;


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running `)
);


