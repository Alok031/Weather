const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
require("./db/conn");
const Register = require("./models/registers");
const { log } = require("console");
const static_path = path.join(__dirname, "../public");

const template_path = path.join(__dirname, "../templates/views");

const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));

app.set("view engine", "hbs");

app.set("views", template_path);

hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// SignUp......=>

app.post("/register", async (req, res) => {
  try {
    const password = req.body.Password;
    const cpassword = req.body.Confirm_Password;

    if (password === cpassword) {
      const registration = new Register({
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
        Confirm_Password: req.body.cpassword,
      });
      const registered = await registration.save();
      res.status(201).render("index");
    } else {
      res.send("Password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//  signIn  .......=>

app.post("/login", async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;
    // console.log(email);
    const useremail = await Register.find({ Email: email });
    // console.log(useremail.Password);
    if (useremail.Password === password) {
      res.status(201).render("index");
    } else {
      res.send("Password is not matching");
    }
  } catch (error) {
    res.status(400).send("invalid email");
  }
});
app.listen(4000, () => {
  console.log("Server running at port no 4000");
});
