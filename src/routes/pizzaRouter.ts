/// require the express module
import express from "express";

// create a new Router object
const pizzaRoutes = express.Router();

pizzaRoutes.get("/", (req, res) => {
  res.render("homePage");
});

pizzaRoutes.get("/specialtyPizza", (req, res) => {
  //const { name, price } = req.query;
  const query = req.query;
  res.render("specialtyPizza", query);
});

pizzaRoutes.get("/review", (req, res) => {
  const query = req.query;
  res.render("review", query);
});

pizzaRoutes.get("/confirm", (req, res) => {
  const query = req.query;
  res.render("confirm", query);
});

pizzaRoutes.post("/confirm", (req, res) => {
  const body = req.body;
  res.render("confirm", body);
});

pizzaRoutes.get("/customPizza", (req, res) => {
  const toppings = [
    "Pepperoni",
    "Sausage",
    "Bacon",
    "Mushrooms",
    "Green Pepper",
    "Onion",
    "Anchovy",
    "Olive",
    "Not Pineapple",
  ];
  res.render("customPizza", { toppings });
});

pizzaRoutes.post("/customPizzaConfirmation", (req, res) => {
  const custom = req.body;
  let price: number = 0.0;
  let freeDelivery: boolean = false;
  let toppings: number = Number(custom.toppings);
  let gf: string = "no";
  if (custom.size === "small") {
    price = 7 + toppings * 0.5;
  } else if (custom.size === "medium") {
    price = 10 + toppings;
  } else {
    price = 12 + toppings * 1.25;
  }
  if (custom.glutenfree) {
    price += 2;
    gf = "yes";
  }
  if (price >= 15) {
    freeDelivery = true;
  }
  let displayPrice: string = price.toFixed(2);

  res.render("customPizzaConfirmation", {
    custom,
    displayPrice,
    freeDelivery,
    gf,
  });
});

export default pizzaRoutes;
