const router = require("express").Router();
const actls = require("../controllers/auth");
const guest = require("../middlewares/guest");
const auth = require("../middlewares/auth");

router.post("/register", guest, actls.register);
router.post("/login", guest, actls.authenticate);

router.post("/forgot-password", guest, actls.forgotPassword);
router.post("/reset-password/:token", guest, actls.resetPassword);

router.get("/me", auth, actls.me);

module.exports = router;
