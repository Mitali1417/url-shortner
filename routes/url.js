const shortid = require("shortid");
const URL = require("../models/url");
const express = require("express");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");


const router = express.Router();

router.post("/", restrictToLoggedInUserOnly, async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL required" });
  const shortId = shortid();
  try {
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    // return res.status(201).json({ id: shortId });
    return res.render("home", { id: shortId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error creating short URL" });
  }
});

router.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching the URL");
  }
});

module.exports = router;
