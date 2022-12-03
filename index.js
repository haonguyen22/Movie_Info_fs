const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const userRouter = require("./routers/userRouter.js");
const homeRouter = require("./routers/homeRouter.js");
const session = require("express-session");
const { postData } = require("./controllers/homeCtrl.js");

const app = express();

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use("/", homeRouter);

app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("Listening on port: 3000");
    // postData();
});
