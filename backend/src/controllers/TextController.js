/* eslint-disable consistent-return */
const models = require("../models");

class TextController {
  static browse = (req, res) => {
    const { page, textSection } = req.query;
    const filter = {};
    if (page) {
      filter.page = page;
    }
    if (textSection) {
      filter.textSection = parseInt(textSection, 10);
    }

    if (filter.page || filter.textSection) {
      models.text
        .findAllTextWithFilter(filter)
        .then(([rows]) => {
          res.send(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else {
      models.text
        .findAll()
        .then(([rows]) => {
          res.send(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  };

  static read = (req, res) => {
    models.text
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

  static edit = (req, res) => {
    const text = req.body;

    text.id = parseInt(req.params.id, 10);
    models.text
      .update(text)
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

  static add = async (req, res) => {
    const text = req.body;

    const textIsValid = await models.text.validTextToCreate(text);

    if (!textIsValid) {
      return res.status(400).send("You must provide all data to create a text");
    }

    models.text
      .insert(text)
      .then(([result]) => {
        return res.status(201).send({ ...text, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.text
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
module.exports = TextController;
