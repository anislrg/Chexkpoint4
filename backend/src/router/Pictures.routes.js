/* eslint-disable */
const express = require("express");

const router = express.Router();
const multer = require("multer");

const { PictureController } = require("../controllers");

// configuration du dossier ou stocker image et nom de l'image

const storage = multer.diskStorage({
  // on defini le chemin ou les fichiers seront stockés
  destination: (_req, _file, cb) => {
    cb(null, "public/assets/images");
  },
  // filename defini le nom du fichier dans le dossier
  // dans ce cas là il sera nommé ex : "2022-20-06-nom-du-fichier"
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// on configure multer pour sauvegarder un seul fichier
// qui est dans le req.body.file
const upload = multer({ storage }).single("file");

router.get("/", PictureController.browse);

router.get("/:id", PictureController.read);

router.post(
  "/upload",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      const pictureData = JSON.parse(req.body.pictureData);
      req.picture = {
        // Tout decoule de pictureData
        file: req.file.filename,
        alt: pictureData.description,
        categories: pictureData.categories,
        picSection: pictureData.picSection,
      };
      return next();
    });
  },
  PictureController.add
);

router.put(
  "/update/:id",
  PictureController.readToUpdate,
  (req, res, next) => {
    const storage = multer.diskStorage({
      // on defini le chemin ou les fichiers seront stockés
      destination: (_req, _file, cb) => {
        cb(null, "public/assets/images");
      },
      // filename defini le nom du fichier dans le dossier
      // dans ce cas là il sera nommé ex : "2022-20-06-nom-du-fichier"
      filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

    const uploadToUpdate = multer({ storage }).single("file");

    uploadToUpdate(req, res, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      const pictureData = JSON.parse(req.body.pictureData);
      // console.log({ pictureData });
      req.picture = {
        id: req.params.id,
        file: req.file.filename,
        alt: pictureData.description,
        categories: pictureData.categories,
        picSection: pictureData.picSection,
      };

      return next();
    });
  },
  PictureController.edit
);

router.delete("/:id", PictureController.delete);

module.exports = router;
