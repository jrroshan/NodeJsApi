const User = require("../models/user.model.js");

//Create and Save a new User

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    city: req.body.city,
    phone: req.body.phone
  });

  //Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some Error Occurred while Creating the User"
      });
    else res.send(data);
  });
};

//Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while retrieving User."
      });
    else res.send(data);
  });
};

//Find a single Users with a UserId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id" + req.params.userId
        });
      }
    } else res.send(data);
  });
};

//Update a users identified by the customerId in the request
exports.update = (req, res) => {
  //Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id" + req.params.userId
        });
      }
    } else res.send(data);
  });
};

//Delete a users with the specified Userid in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id" + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully! ` });
  });
};

//Delete all users from the database
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all user"
      });
    else res.send({ message: `All User were deleted successfully!` });
  });
};
