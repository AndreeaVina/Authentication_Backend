  const router = require("express").Router();
  const {
      createUser,
      login,
      getUserByUserId,
      getUsers,
      updateUsers,
      deleteUser
  } = require("./user.controller");
  router.post("/", createUser);
  router.get("/", getUsers);

  module.exports = router;