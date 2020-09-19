const express = require("express");
const router = express.Router();
const { Hotel } = require("../models/Hotel");
const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "hoteluploads/");
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

var hoteluploads = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/hotelUploadImage", auth, (req, res) => {
  hoteluploads(req, res, (err) => {
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

router.post("/hotelUploadProduct", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const hotel = new Hotel(req.body);

  hotel.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/hotelGetProducts", (req, res) => {
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
    Hotel.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, hotels) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, hotels, postSize: hotels.length });
      });
  } else {
    Hotel.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, hotels) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, hotels, postSize: hotels.length });
      });
  }
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/hotelProducts_by_id", (req, res) => {
  let type = req.query.type;
  let hotelIds = req.query.id;

  console.log("req.query.id", req.query.id);

  if (type === "array") {
    let ids = req.query.id.split(",");
    hotelIds = [];
    hotelIds = ids.map((item) => {
      return item;
    });
  }

  console.log("hotelIds", hotelIds);

  //we need to find the product information that belong to product Id
  Hotel.find({ _id: { $in: hotelIds } })
    .populate("writer")
    .exec((err, hotel) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(hotel);
    });
});

module.exports = router;
