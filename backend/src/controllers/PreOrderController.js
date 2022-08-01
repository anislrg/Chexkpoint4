const models = require("../models");

class PreOrderController {
  static browse = async (req, res) => {
    try {
      const [results] = await models.preorder.findAll();
      // console.log(results);
      return res.status(200).json(results);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static read = (req, res) => {
    models.preorder
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
    const preorder = req.body;
    // console.log(preorder);
    // TODO validations (length, format...)
    preorder.id = parseInt(req.params.id, 10);

    models.preorder
      .update(preorder)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
        // console.log(preorder);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static archived = (req, res) => {
    const preorder = req.body;
    // console.log(preorder);
    // TODO validations (length, format...)
    preorder.id = parseInt(req.params.id, 10);

    models.preorder
      .archived(preorder)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
        // console.log(preorder);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = async (req, res) => {
    const preorder = req.body;
    try {
      const validOrder = await models.preorder.validPreorderToCreate({
        ...preorder,
      });
      if (!validOrder) {
        return res
          .status(400)
          .send(
            "You must provide a valid lastname, firstname, email and payment"
          );
      }
      return models.preorder.insert(preorder).then(([result]) => {
        return res.status(201).send({ ...preorder, id: result.insertId });
      });
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    // TODO validations (length, format...)
  };

  static delete = (req, res) => {
    models.preorder
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

module.exports = PreOrderController;
