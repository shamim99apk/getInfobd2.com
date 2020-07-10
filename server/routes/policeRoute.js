const express = require("express");
const router = express.Router();
const { PoliceModel } = require("../models/PoliceModel");

const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "policeinfoupload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var PoliceUpload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadPoliceImage", auth, (req, res) => {
  PoliceUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadPolice", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const police = new PoliceModel(req.body);

  police.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getPolice", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};

  PoliceModel.find(findArgs)
    .populate("writer")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, polices) => {
      if (err) return res.status(400).json({ success: false, err });
      res
        .status(200)
        .json({ success: true, polices, postSize: polices.length });
    });
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/polices_by_id", (req, res) => {
  let type = req.query.type;
  let policeId = req.query.id;

  console.log("req.query.id", req.query.id);

  if (type === "array") {
    let ids = req.query.id.split(",");
    policeId = [];
    policeId = ids.map((item) => {
      return item;
    });
  }

  console.log("policeId", policeId);

  //we need to find the product information that belong to product Id

  PoliceModel.find({ _id: { $in: policeId } })
    .populate("writer")
    .exec((err, police) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(police);
    });
});

module.exports = router;
