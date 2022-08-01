/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

const page = ["home", "methode", "produit", "propos", "contact"];

const textSchema = Joi.object({
  title: Joi.string().max(255),
  body: Joi.string().max(50000).required(),
  page: Joi.string().valid(...page),
  textSection: Joi.number().required(),
});

class TextManager extends AbstractManager {
  static table = "text";

  // ! ---------- Ecrase le findAll d'AbstractManager ----------
  findAll() {
    return this.connection.query(
      `SELECT id, title, body, page, textSection FROM  ${this.table}`
    );
  }
  // !  ----------_ ----------_ ----------_ ----------_ ----------

  get(text) {
    return this.connection.query(
      `SELECT title, body, page, textSection FROM ${TextManager.table} `,
      [text.title, text.body, text.page, text.textSection]
    );
  }

  insert(text) {
    return this.connection.query(
      `INSERT INTO ${TextManager.table} (title, body, page, textSection) values (?, ?, ?, ?)`,
      [text.title, text.body, text.page, text.textSection]
    );
  }

  update(text) {
    return this.connection.query(
      `UPDATE ${TextManager.table} SET ? WHERE id = ?`,
      [text, text.id]
    );
  }

  findAllTextWithFilter(filter) {
    const sqlValues = [];
    let sql = `SELECT id, title, body, page, textSection FROM ${this.table}`;
    if (filter.page && !filter.textSection) {
      sql += " WHERE page= ?";
      sqlValues.push(filter.page);
    } else if (!filter.page && filter.textSection) {
      sql += " WHERE textSection = ? ";
      sqlValues.push(filter.textSection);
    } else {
      sql += " WHERE page = ? AND textSection = ?";
      sqlValues.push(filter.page, filter.textSection);
    }

    return this.connection.query(sql, sqlValues);
  }

  findAllByPage(filter) {
    return this.connection.query(
      `SELECT id, title, body, page, textSection FROM ${this.table} WHERE page = ?`,
      [filter.page]
    );
  }

  findAllBySection(filter) {
    return this.connection.query(
      `SELECT id, title, body, page, textSection FROM ${this.table} WHERE textSection = ?`,
      [filter.textSection]
    );
  }

  async validTextToCreate(text) {
    try {
      await textSchema.validateAsync(text);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = TextManager;
