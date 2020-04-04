module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  //Create a new User
  app.post("/users", users.create);

  //retrieve all Users
  app.get("/users", users.findAll);

  //retrieve a single users with userid
  app.get("/users/:userId", users.findOne);

  //update a User with UserId
  app.put("/users/:userId", users.update);

  //Delete a User with UserId
  app.delete("/users/:userId", users.delete);

  //Delete all Users
  app.delete("/users", users.deleteAll);
};
