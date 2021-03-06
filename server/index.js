const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));

app.use("/api/blood", require("./routes/blood"));
app.use("/api/grocery", require("./routes/grocery"));
app.use("/api/volunteer", require("./routes/volunteer"));
app.use("/api/police", require("./routes/police"));
app.use("/api/hotel", require("./routes/hotel"));
app.use("/api/pharmacy", require("./routes/pharmacy"));
app.use("/api/emergency", require("./routes/emergency"));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client

app.use("/blooduploads", express.static("blooduploads"));
app.use("/groceryuploads", express.static("groceryuploads"));
app.use("/volunteeruploads", express.static("volunteeruploads"));
app.use("/policeuploads", express.static("policeuploads"));
app.use("/hoteluploads", express.static("hoteluploads"));
app.use("/pharmacyuploads", express.static("pharmacyuploads"));
app.use("/emergencyuploads", express.static("emergencyuploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
