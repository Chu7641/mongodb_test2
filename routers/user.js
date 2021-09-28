const express = require("express");
const User = require("../Models/User");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: "Login failed" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {}
});

router.get("/me", auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

//logout 1

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.token = req.user.token.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error });
  }
});

//logout all

router.post("/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
