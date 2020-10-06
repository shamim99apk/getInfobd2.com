const express = require("express");
const router = express.Router();
const { Pharmacy } = require("../models/Pharmacy");
const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pharmacyuploads/");
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

var pharmacyuploads = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/pharmacyUploadImage", auth, (req, res) => {
  pharmacyuploads(req, res, (err) => {
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

router.post("/pharmacyUploadProduct", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const pharmacy = new Pharmacy(req.body);

  pharmacy.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/pharmacyGetProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // findArgs[key] = {
        //   $gte: req.body.filters[key][0],
        //   $lte: req.body.filters[key][1],
        // };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs);

  if (term) {
    Pharmacy.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, pharmacies) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, pharmacies, postSize: pharmacies.length });
      });
  } else {
    Pharmacy.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, pharmacies) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, pharmacies, postSize: pharmacies.length });
      });
  }
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/pharmacyProducts_by_id", (req, res) => {
  let type = req.query.type;
  let pharmacyIds = req.query.id;

  console.log("req.query.id", req.query.id);

  if (type === "array") {
    let ids = req.query.id.split(",");
    pharmacyIds = [];
    pharmacyIds = ids.map((item) => {
      return item;
    });
  }

  console.log("hotelIds", pharmacyIds);

  //we need to find the product information that belong to product Id
  Pharmacy.find({ _id: { $in: pharmacyIds } })
    .populate("writer")
    .exec((err, pharmacy) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(pharmacy);
    });
});

module.exports = router;
