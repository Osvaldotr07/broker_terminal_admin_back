const express = require("express");
const FormService = require("../services/form");
const passport = require("passport");
const  authenticated  = require("../utils/middlewares/middleware");

const UserService = require("../services/users");

require("../utils/auth/strategies/jwt");

function usersApi(app) {
  const router = express.Router();
  app.use("/api/users", router);
  const userService = new UserService()

  router.get('/user-recovery/:email', async (req, res) => {
      const { email } = req.params

      let user = userService.getUser(email)

      res.send(user)
  })
}

module.exports = usersApi;