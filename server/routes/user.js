const router = require("express").Router();
const uctls = require("../controllers/UserController");

router.post("/register", uctls.register);

module.exports = router;
