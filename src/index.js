const express = require("express");
const bodyParser = require("body-parser");
const route = require("./router/route.js");
const { default: mongoose } = require("mongoose");
const app = express();
//const validation= require("./middleware/validation");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://jay123:pqwoie123@cluster0.xlqz2mn.mongodb.net/jay-DB",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Hi Jay! MongoDb is connected"))
  .catch((err) => console.log(err));

//app.use(validation.validateRequest);
app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
