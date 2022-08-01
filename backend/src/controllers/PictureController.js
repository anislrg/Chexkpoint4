/* eslint-disable consistent-return */

const models = require("../models");

class PictureController {
  static browse = (req, res) => {
    const { categories, picSection } = req.query;
    const filter = {};
    if (picSection) {
      filter.picSection = parseInt(picSection, 10);
    }
    if (categories) {
      filter.categories = categories;
    }
    if (filter.picSection || filter.categories) {
      // console.log(filter);
      models.pictures
        .findAllWithFilter(filter)
        .then(([rows]) => {
          res.send(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else {
      // console.log("all");
      models.pictures
        .findAll()
        .then(([rows]) => {
          res.send(rows);
          // console.log(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  };

  static read = (req, res) => {
    models.pictures
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

  static readToUpdate = (req, res, next) => {
    models.pictures
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
          req.pictureToUpdate = rows[0];
          next();
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = async (req, res) => {
    let picture = req.body;
    if (req.picture) {
      picture = req.picture;
    }

    const picturesIsValid = await models.pictures.validPicturesToCreate(
      picture
    );

    if (!picturesIsValid) {
      return res.status(400).send("You must provide all data to add a picture");
    }

    models.pictures
      .insert(picture)
      .then(([result]) => {
        return res.status(201).send({ ...picture, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const { picture } = req;

    // TODO validations (length, format...)

    picture.id = parseInt(req.params.id, 10);

    models.pictures
      .update(picture)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.pictures
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}
module.exports = PictureController;
