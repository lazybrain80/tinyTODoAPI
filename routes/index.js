var express = require("express");
var router = express.Router();

/* GET '/'  */
router.get("/", function (req, res, next) {
  res.status(200).json({});
});

router.use("/todo", require("./todo"));

module.exports = router;
