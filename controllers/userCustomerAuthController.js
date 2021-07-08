const bcrypt = require("bcrypt");
const Joi = require("joi");
const {
  UserCustomer,
  validateUserCustomer,
} = require("../models/userCustomer");

/*
Errors: 
400 -> bad request. Body missing requirements. 
404 -> resource not found in the server.
*/

const login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserCustomer.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
};

const signUp = async (req, res) => {
  // validate req.body object
  const { error } = validateUserCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether the provided email already exists in the database
  let user = await UserCustomer.findOne({ email: req.body.email });
  if (user)
    return res
      .status(404)
      .send("User already registered. Please use another email.");

  // after performed all validations, create new customer and save
  user = new UserCustomer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  /* hash the password before storing in the database */
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  /* generate jwt token and send through the header */
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = { login, signUp };
