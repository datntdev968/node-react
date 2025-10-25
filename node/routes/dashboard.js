const router = require("express").Router();
const dctls = require("../controllers/dashboard");
const auth = require("../middlewares/auth");

router.get("/total-order", auth, dctls.totalOrder);

module.exports = router;
