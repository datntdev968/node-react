const router = require("express").Router();
const uctls = require("../controllers/auth");
const guest = require("../middlewares/guest");

router.post("/register", guest, uctls.register);
router.post("/login", guest, uctls.authenticate);

router.post("/forgot-password", guest, uctls.forgotPassword);
router.post("/reset-password/:token", guest, uctls.resetPassword);

module.exports = router;
