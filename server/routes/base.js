const router = require("express").Router();
const bctls = require("../controllers/base");

router.post("/destroy", bctls.deleteRecords);

module.exports = router;
