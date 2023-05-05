const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const User = require("./models/UserModel");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Form is submitted");
});

app.get("/user/add-expense", (req, res, next) => {
  res.sendFile(__dirname + "/views/expense.html");
});

app.post("/user/add-expense", async (req, res, next) => {
  try {
    if (!req.body.category) {
      throw new Error("Category is mendatory");
    }

    const price = req.body.price;
    const product = req.body.productName;
    const category = req.body.category;

    const data = await User.create({
      price: price,
      productName: product,
      category: category,
    });
    res.status(201).json({ newUserDetail: data });
    //res.redirect('/user/get-users')
  } catch (err) {
    console.log(err);
  }
});
app.get("/user/get-expense", async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ allUsers: users });
});

app.delete("/user/delete-expense/:id", async (req, res, next) => {
  const uId = req.params.id;
  const data = await User.findByPk(uId);
  await User.destroy({ where: { id: uId } });
  // res.status(200);
  res.status(200).json({ deletedExpense: data });
});

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
