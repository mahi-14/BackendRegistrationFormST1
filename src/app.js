//express is node js framework which helps to build websites and backends
const express = require("express"); //importing express
const path = require("path"); //importing path:inbuilt module
const app = express(); //constant variable with the help of express function
const hbs = require("hbs"); //importing hbs:handlebars template engine
require("./db/conn"); //importing database
const Register = require("./models/registers"); //importing register---> collection of database
const { json } = require("express");

const port = process.env.PORT || 3000; //to run project at this port
//console.log(path.join(__dirname, "../public")); //to get output on browser of public folder

const static_path = path.join(__dirname, "../public"); //it will give output of static html file
const template_path = path.join(__dirname, "../templates/views"); //giving path of views
const partials_path = path.join(__dirname, "../templates/partials"); //giving path of partials

app.use(express.json()); //call json file handle by express
app.use(express.urlencoded({ extended: false })); //to get form data

app.use(express.static(static_path)); //find and give output for index.html
app.set("view engine", "hbs"); //tell express application that we are using handlebars
app.set("views", template_path); //tell express views folder path
hbs.registerPartials(partials_path); //tell express partials path

app.get("/", (req, res) => {
  //call back function two objects req res
  //sending response : rendering index page
  res.render("index");
});

app.get("/register", (req, res) => {
  //sending response : rendering register page
  res.render("register");
});

app.get("/login", (req, res) => {
  //sending response : call login page
  res.render("login");
});

//create a new user in our database
app.post("/register", async (req, res) => {
  //async function return promise
  //with async function use try catch
  try {
    const password = req.body.password; //this will store data enter by user in the form
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      //checking for password is same or not
      const registerUser = new Register({
        //fetching data from Register collection
        //from schema
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: password,
        confirmpassword: cpassword,
      });
      const registered = await registerUser.save(); //to store/save data at database
      res.status(201).render("index"); //after register succussfully it will show home page
    } else {
      res.send("password are not matching"); //if we give different passwords this will going to run
    }
  } catch (error) {
    res.status(400).send(error); //if we give wrong informations we get this error
  }
});

//login check
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email; //email and password enter by user
    const password = req.body.password;

    //using template literals
    //console.log(`${email} and password is ${password}`);
    //to check email id which we enter is present or not
    const useremail = await Register.findOne({ email: email }); //in this first email is of database and second email is enter by user
    if (useremail.password === password) {
      res.status(201).render("index"); //if password is matching it show home page
    } else {
      res.send("password are not matching");
    }
    //read data
    //res.send(useremail);
    //console.log(useremail);
  } catch (error) {
    res.status(400).send("invalid email");
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`); //this will show on terminal
});
