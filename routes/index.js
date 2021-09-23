const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/", controller.getHomepage);
router.post("/username", controller.postUsername);
router.get("/chatroom/username/:username", controller.getChatroom);

module.exports = router;
