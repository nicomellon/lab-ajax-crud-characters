const express = require("express");
const router = express.Router();

// middleware
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
router.use(logger);

// routes

router.route("/characters").post(async (req, res) => {
  try {
    const { name, occupation, cartoon, weapon } = req.body;
    const newCharacter = await charactersAPI.createOneRegister({
      name,
      occupation,
      cartoon,
      weapon,
    });
    console.log(newCharacter);
  } catch (err) {
    console.error(err);
  }
});

router.get("/", (req, res) => res.render("index"));

module.exports = router;
