const { Product, validate } = require("../models/product");
const express = require("express");
const router = express.Router();

// ------- PRODUCTS CRUD OPERATIONS ------

// ROUTE TO GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const products = await Product.find();

  // Check whether there are products in the database
  if (!products.length) return res.send("There are no products to display.");

  res.send(products);
});

// ROUTE TO GET ONE PRODUCT

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

// ROUTE TO CREATE PRODUCT

router.post("/", async (req, res) => {
  // validate req.body object
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    productName: req.body.productName,
    sizes: req.body.sizes,
    prices: req.body.prices,
    category: req.body.category,
    img: req.body.img,
  });

  product = await product.save();

  res.send(product);
});

// ROUTE TO UPDATE PRODUCT INFORMATION

router.put("/:id", async (req, res) => {
  // validate req.body object
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether the product exists in the database. If exists update it.
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        productName: req.body.productName,
        sizes: req.body.sizes,
        prices: req.body.prices,
        category: req.body.category,
        img: req.body.img,
      },
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

// ROUTE TO DELETE A PRODUCT

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found");

  res.send(product);
});

module.exports = router;
