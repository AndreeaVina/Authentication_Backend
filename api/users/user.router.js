  const router = require("express").Router();
  const { checkToken } = require("../../auth/token_validation.js");
  const {
      createUser,
      login,
      // getUsers,
      updateUsers,
      deleteUser
  } = require("./user.controller");
  const { getUserByEmail } = require("./user.service");
  router.post("/", checkToken, createUser);
  // router.get("/", checkToken, getUsers);
  // router.get("/:email", getUserByEmail);
  router.post("/login", login);
  module.exports = router;