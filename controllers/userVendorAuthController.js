const bcrypt = require("bcrypt");
const Joi = require("joi");
const { UserVendor, validateUserVendor } = require("../models/userVendor");

/*
Errors: 
400 -> bad request. Body missing requirements. 
404 -> resource not found in the server.
*/

const login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserVendor.findOne({ vendorName: req.body.vendorName });
  if (!user) return res.status(404).send("Invalid van name or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(404).send("Invalid van name or password.");

  const token = user.generateAuthToken();
  res.send(token);
};

const signUp = async (req, res) => {
  // validate req.body object
  const { error } = validateUserVendor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether the provided email already exists in the database
  let user = await UserVendor.findOne({ email: req.body.email });
  if (user)
    return res
      .status(404)
      .send("User already registered. Please use another email.");

  // after performed all validations, create new customer and save
  user = new UserVendor({
    vendorName: req.body.vendorName,
    contactName: req.body.contactName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
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
      _id: user._id,
      vendorName: user.vendorName,
    });
};

function validate(req) {
  const schema = Joi.object({
    vendorName: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = { login, signUp };
