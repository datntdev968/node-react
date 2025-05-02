const router = require("express").Router();
const uctls = require("../controllers/user");

router.get("/", uctls.paginate);

module.exports = router;
