const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const app = express();
const db = require("./config/keys").mongoUri;

mongoose.connect(db, { useNewUrlParser: true })
    .then(
        res => console.log("connected to Atlas"),
        err => console.log(err)
    );

const port = process.env.PORT || 3000;

const indexRouter = require("./routes/api/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});