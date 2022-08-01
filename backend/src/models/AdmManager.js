/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const argon2 = require("argon2");
const AbstractManager = require("./AbstractManager");

// password must contain almost one upper case, one lower case, a number and a special character contained in [!@#$%^&*], and have 8 to 32 characters
const schemaForCreation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
  question: Joi.string().max(255).required(),
});

const schemaForUpdate = Joi.object({
  id: Joi.number().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
});
const schemaForReset = Joi.object({
  id: Joi.number().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  temporaryPassword: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
});

class AdmManager extends AbstractManager {
  static table = "adm";

  insert(adm) {
    if (adm) {
      return this.connection.query(
        `insert into ${AdmManager.table} (email, password, question) values (?, ?, ?)`,
        [adm.email, adm.password, adm.question]
      );
    }
    return this.connection.query(
      `insert into ${AdmManager.table} (email, password) values (?, ?)`,
      [adm.email, adm.password]
    );
  }

  update(adm) {
    if (adm.temporaryPassword) {
      return this.connection.query(
        `update ${AdmManager.table} set temporaryPassword = ?  where id = ?`,
        [adm.temporaryPassword, adm.id]
      );
    }
    return this.connection.query(
      `update ${AdmManager.table} set password = ?, temporaryPassword = null where id = ?`,
      [adm.password, adm.id]
    );
  }

  emailAlreadyExists(email) {
    return this.connection
      .query(`SELECT id FROM ${AdmManager.table} WHERE email=?`, [email])
      .then(([results]) => results.length);
  }

  async validate(adm, creation = true) {
    try {
      if (creation) {
        await schemaForCreation.validateAsync(adm);
      } else {
        await schemaForUpdate.validateAsync(adm);
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async validateReset(adm) {
    try {
      await schemaForReset.validateAsync(adm);

      return true;
    } catch (err) {
      return false;
    }
  }

  async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async verifyPassword(password, hashedPassword) {
    const passwordIsValid = await argon2.verify(hashedPassword, password);
    return passwordIsValid;
  }

  find(id) {
    return this.connection.query(
      `select id, email from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`select id, email from  ${this.table}`);
  }

  findByEmail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = AdmManager;
