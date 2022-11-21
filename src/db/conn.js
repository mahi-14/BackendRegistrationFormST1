//connecting with database
const mongoose = require("mongoose"); //importing mongoose which is library of mongodb
mongoose
  .connect("mongodb://localhost:27017/userRegistration", {}) //connecting mongodb with connect method -> userRegistration is database name we have given
  //connect return promise
  .then(() => {
    //this will tell connection is successful or failed
    console.log(`connection successful`);
  })
  .catch((e) => {
    //if any error occur this will going to catch
    console.log(`connection failed`);
  });
