var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
const keys = require("./config/keys");
var logger = require("morgan");
var bodyParser = require("body-parser");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, function(err, db) {
    if (!err) {
        console.log("Database Connected!");
    } else {
        console.log("Database Not Connected!");
    }
});
var mainRoutes = require("./server/router/index");
var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "*");
    return next();
});
app.use("/", mainRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/public/"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
    });
}
const PORT = process.env.PORT || 8000;
var listener = http.createServer(app);
var listener = app.listen(PORT, function() {
    console.log("Server Started on port " + listener.address().port);
});