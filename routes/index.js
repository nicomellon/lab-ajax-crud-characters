const express = require("express");
const router = express.Router();

// middleware
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
router.use(logger);

// routes

router
  .route("/characters")
  .get(async (req, res) => {
    try {
      const responseFromApi = await charactersAPI.getFullList();
      clearList();
      responseFromApi.data.forEach((character) => populateList(character));
    } catch (err) {
      console.error(err);
    }
  })
  .post(async (req, res) => {
    try {
      const { name, occupation, cartoon, weapon } = req.body;
      const newCharacter = await charactersAPI.createOneRegister({
        name,
        occupation,
        cartoon,
        weapon,
      });
      console.log(newCharacter);
      res.redirect("/");
    } catch (err) {
      console.error(err);
    }
  });

router.get("/", (req, res) => res.render("index"));

module.exports = router;
