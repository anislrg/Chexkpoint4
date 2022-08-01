/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

const pics = ["carousel", "home", "methode", "produit", "propos", "contact"];

const picturesSchema = Joi.object({
  id: Joi.number(),
  file: Joi.string().max(255),
  alt: Joi.string().max(255).required(),
  pictogram: Joi.string().max(255),
  categories: Joi.string().valid(...pics),
  picSection: Joi.number(),
  text_id: Joi.number(),
});

class PictureManager extends AbstractManager {
  static table = "pictures";

  find(id) {
    return this.connection.query(
      `select file, alt, pictogram, categories, picSection from  ${this.table} where id = ? `,
      [id]
    );
  }

  findBySection(id) {
    return this.connection.query(
      `select file, alt, pictogram, categories, picSection from  ${this.table} where picSection = ? `,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `SELECT i.id, i.file, i.alt, i.pictogram, i.categories, i.picSection, t.body as text FROM ${this.table} as i LEFT JOIN text as t ON t.id=i.text_id`
    );
  }

  findAllWithFilter(filter) {
    const sqlValues = [];
    let sql = `SELECT id, file, alt, pictogram, categories, picSection FROM ${this.table}`;
    if (filter.categories && !filter.picSection) {
      sql += " WHERE categories= ?";
      sqlValues.push(filter.categories);
    } else if (!filter.categories && filter.picSection) {
      sql += " WHERE picSection = ?";
      sqlValues.push(filter.picSection);
    } else {
      sql += " WHERE categories = ? AND picSection = ? ";
      sqlValues.push(filter.categories, filter.picSection);
    }
    // console.log(sql, sqlValues);
    return this.connection.query(sql, sqlValues);
  }

  get(pictures) {
    return this.connection.query(
      `SELECT file, alt, categories, picSection FROM ${this.table} `,
      [pictures.file, pictures.alt, pictures.categories, pictures.picSection]
    );
  }

  insert(pictures) {
    return this.connection.query(`INSERT INTO ${PictureManager.table} SET ?`, [
      pictures,
    ]);
  }

  update(pictures) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id=?`, [
      pictures,
      pictures.id,
    ]);
  }

  async validPicturesToCreate(pictures) {
    try {
      await picturesSchema.validateAsync(pictures);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = PictureManager;
