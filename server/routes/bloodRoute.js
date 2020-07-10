const express = require("express");
const router = express.Router();
const { BloodModel } = require("../models/BloodModel");
const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "bloodUpload/");
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

var BloodUpload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadBloodImage", auth, (req, res) => {
  BloodUpload(req, res, (err) => {
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

router.post("/uploadBlood", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const blood = new BloodModel(req.body);

  blood.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getBlood", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};

  BloodModel.find(findArgs)
    .populate("writer")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, bloods) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, bloods, postSize: bloods.length });
    });
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/bloods_by_id", (req, res) => {
  let type = req.query.type;
  let bloodId = req.query.id;

  console.log("req.query.id", req.query.id);

  if (type === "array") {
    let ids = req.query.id.split(",");
    bloodId = [];
    bloodId = ids.map((item) => {
      return item;
    });
  }

  console.log("bloodId", bloodId);

  //we need to find the product information that belong to product Id

  BloodModel.find({ _id: { $in: bloodId } })
    .populate("writer")
    .exec((err, blood) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(blood);
    });
});

module.exports = router;
