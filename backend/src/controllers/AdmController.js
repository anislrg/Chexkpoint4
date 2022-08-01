const jwt = require("jsonwebtoken");
const models = require("../models");
const generatePassword = require("../helpers/generatePassword");

class AdmController {
  static browse = async (req, res) => {
    try {
      const [results] = await models.adm.findAll();
      return res.status(200).json(results);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static read = (req, res) => {
    models.adm
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = async (req, res) => {
    const { password } = req.body;
    const id = req.body.id ? req.body.id : parseInt(req.params.id, 10);

    try {
      // TODO validations (length, format...)
      const validAdm = await models.adm.validate({ id, password }, false);
      if (!validAdm) {
        return res
          .status(400)
          .send("You must provide a valid password and/or role");
      }

      // Hash password
      const hashedPassword = await models.adm.hashPassword(password);

      const [result] = await models.adm.update({
        id,
        password: hashedPassword,
      });

      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static register = async (req, res) => {
    const { email, password, question } = req.body;

    try {
      // TODO validations (length, format...)
      const validAdm = await models.adm.validate({ email, password, question });
      if (!validAdm) {
        return res
          .status(400)
          .send("You must provide a valid email and password and question");
      }

      // Check if email already exists
      const emailAlreadyUsed = await models.adm.emailAlreadyExists(email);
      if (emailAlreadyUsed) {
        return res.status(400).send("Email already Used");
      }

      // Hash password
      const hashedPassword = await models.adm.hashPassword(password);

      const [result] = await models.adm.insert({
        email,
        password: hashedPassword,
        question,
      });
      const [[admCreated]] = await models.adm.find(result.insertId);

      delete admCreated.hashedPassword;

      return res.status(201).json(admCreated);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = (req, res) => {
    models.adm
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("You must provide an email and a passowrd");
    }

    try {
      const [[adm]] = await models.adm.findByEmail(email);
      if (!adm) {
        return res.status(403).send("Invalid email or password");
      }

      if (await models.adm.verifyPassword(password, adm.password)) {
        // Create token
        const token = jwt.sign({ id: adm.id }, process.env.ACCESS_JWT_SECRET, {
          expiresIn: process.env.ACCESS_JWT_EXPIRESIN,
        });
        return res

          .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json({ id: adm.id, email: adm.email });
      }

      return res.status(403).send("Invalid email or password");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static authorization = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      req.admId = decoded.id;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static clearCookie = (req, res) => {
    return res.clearCookie("accessToken").sendStatus(200);
  };

  static isSameId = (req, res, next) => {
    let { id } = req.params;

    id = parseInt(id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).send("You must provide a valid id");
    }

    if (id !== req.admId) {
      return res.sendStatus(403);
    }

    return next();
  };

  static checkEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.sendStatus(400);
    }

    try {
      const [[adm]] = await models.adm.findByEmail(email);

      if (!adm) {
        return res.sendStatus(400);
      }

      delete adm.password;
      req.adm = adm;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static createTemporaryPassword = async (req, res, next) => {
    const temporaryPassword = generatePassword();
    try {
      const temporaryHashedPassword = await models.adm.hashPassword(
        temporaryPassword
      );
      await models.adm.update({
        id: req.adm.id,
        temporaryPassword: temporaryHashedPassword,
      });
      req.adm.temporaryPassword = temporaryPassword;

      const token = jwt.sign(
        { id: req.adm.id },
        process.env.RESET_PASSWORD_JWT_SECRET,
        { expiresIn: process.env.RESET_PASSWORD_JWT_EXPIRESIN }
      );

      res.cookie("resetPasswordToken", token, {
        httpOnly: true,
        secure: process.env.RESET_PASSWORD_JWT_SECURE === "true",
        maxAge: parseInt(process.env.RESET_PASSWORD_JWT_COOKIE_MAXAGE, 10),
      });
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static verifyResetPasswordToken = async (req, res, next) => {
    const token = req.cookies.resetPasswordToken;
    if (!token) {
      return res.sendStatus(401);
    }

    try {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_JWT_SECRET);
      req.id = decoded.id;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static verifyUser = async (req, res, next) => {
    const admData = {
      id: req.id,
      email: req.body.email,
      password: req.body.password,
      temporaryPassword: req.body.temporaryPassword,
    };
    // eslint-disable-next-line no-restricted-syntax
    // le bug vient de Adm
    try {
      const valideData = await models.adm.validateReset(admData);
      if (!valideData) {
        console.warn(valideData);
        return res.sendStatus(400);
      }

      const [[adm]] = await models.adm.findByEmail(admData.email);

      // check temporary password
      const valideTemporaryPassword = await models.adm.verifyPassword(
        admData.temporaryPassword,
        adm.temporaryPassword
      );

      if (!adm || req.id !== adm.id || !valideTemporaryPassword) {
        return res.status(401).send("You are not the right user");
      }

      req.body = { id: adm.id, password: admData.password };
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = AdmController;
