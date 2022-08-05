/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

// eslint-disable-next-line no-unused-vars
const schemaForCreation = Joi.object({
  lastname: Joi.string()
    .pattern(/^[a-z ,.'-]+$/i)
    .required(),
  firstname: Joi.string()
    .pattern(/^[a-z ,.'-]+$/i)
    .required(),
  dates: Joi.string(),
  email: Joi.string().required(),
});

class PreOrderManager extends AbstractManager {
  static table = "preorder";

  insert(preorder) {
    return this.connection.query(
      `insert into ${PreOrderManager.table} (lastname, firstname, email,  date, dates) VALUES (?, ?, ?, ?,?)`,
      [
        preorder.lastname,
        preorder.firstname,
        preorder.email,
        preorder.date,
        preorder.dates,
      ]
    );
  }

  findAll() {
    return this.connection.query(
      `SELECT id, lastname, firstname, email, checkboxStatus, archived, date, dates FROM ${this.table}`
    );
  }

  find(id) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  findByDates() {
    return this.connection.query(`SELECT dates, lastname FROM ${this.table}`);
  }

  update(preorder) {
    return this.connection.query(
      `UPDATE ${this.table} SET checkboxStatus = ? WHERE id = ? `,
      [preorder.checkboxStatus, preorder.id]
    );
  }

  archived(preorder) {
    return this.connection.query(
      `UPDATE ${this.table} SET archived = ? WHERE id = ? `,
      [preorder.archived, preorder.id]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }

  async validPreorderToCreate(preorder, creation = true) {
    try {
      if (creation) {
        await schemaForCreation.validateAsync(preorder);
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = PreOrderManager;
