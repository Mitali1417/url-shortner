const express = require("express");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");
const { handleGenerateURL, handleGetURL } = require("../controllers/url");

const router = express.Router();

router.post("/", restrictToLoggedInUserOnly, handleGenerateURL);

router.get("/:shortId", handleGetURL);

module.exports = router;
