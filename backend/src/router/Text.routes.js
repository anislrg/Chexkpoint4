const express = require("express");

const { TextController } = require("../controllers");

const router = express.Router();

router.get("/", TextController.browse);
router.get("/:id", TextController.read);
router.post("/", TextController.add);
router.put("/:id", TextController.edit);
router.delete("/:id", TextController.delete);

module.exports = router;
