const mongoose= require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/regi")
  .then(() => {
    console.log("connected to database")}
    )
  .catch((err) => console.log("err"))
