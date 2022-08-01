const express = require("express");

const { AdmController, EmailController } = require("../controllers");

const router = express.Router();

router.get("/", AdmController.browse);
router.get("/logout", AdmController.authorization, AdmController.clearCookie);
router.get("/:id", AdmController.read);

router.post("/login", AdmController.login);
router.post("/", AdmController.register);

router.post(
  "/password-forgotten",
  AdmController.checkEmail,
  AdmController.createTemporaryPassword,
  EmailController.sendPasswordForgotten
);
router.post(
  "/reset-password",
  AdmController.verifyResetPasswordToken,
  AdmController.verifyUser,
  AdmController.edit
);

router.put(
  "/:id",
  AdmController.edit,
  AdmController.authorization,
  AdmController.isSameId
);
router.delete("/:id", AdmController.delete);

module.exports = router;
