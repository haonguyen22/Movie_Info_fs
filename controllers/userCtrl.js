const crypto = require("crypto-js");
const homeHps = require("../helpers/homeHps");
const { insertFavorite, deleteFavorite } = require("../models/favoriteModel");
const moviesModel = require("../models/moviesModel");
const userModel = require("./../models/userModel");

const hashLength = 64;

exports.getLoginPage = (req, res) => {
    res.render("login", { style: "login", title: "login" });
    if (!req.session.user) res.render("login", { style: "login", title: "login" });
    else res.redirect("/");
};

exports.postLogin = async (req, res) => {
    const { username, password, remember } = req.body;
    const userDB = await userModel.getUserByUsername(username);

    if (userDB != null) {
        const passDB = userDB.password;
        const salt = passDB.slice(hashLength);
        const passSalt = password + salt;
        const passHashed = crypto.SHA3(passSalt, { outputLength: hashLength * 4 }).toString(crypto.enc.Hex);
        if (passDB === passHashed + salt) {
            req.session.user = userDB.id;
            if (!remember) req.session.cookie.maxAge = 30 * 60 * 1000; // 30 minutes
            else req.session.remember = 365 * 24 * 60 * 60 * 1000; // 1 year
        }
    }

    if (!req.session.user) {
        res.render("login", {
            style: "login",
            title: "Login",
            username,
            password,
            status: "Username hoặc password không đúng",
        });
    } else {
        res.redirect("/");
    }
};

exports.getRegisterPage = (req, res) => {
    res.render("register", { style: "register", title: "Register" });
};

exports.postRegister = async (req, res) => {
    const { username, password, name, email, DOB } = req.body;
    const salt = Date.now().toString(16);
    const passSalt = password + salt;
    const passHashed = crypto.SHA3(passSalt, { outputLength: hashLength * 4 }).toString(crypto.enc.Hex);

    const isUsernameExist = await userModel.getUserByUsername(username);
    const newUser = {
        username,
        password: passHashed + salt,
        Name: name,
        email,
        dob: DOB,
    };

    if (!isUsernameExist) {
        await userModel.insertUser(newUser);
        res.render("register", {
            style: "register",
            title: "Register",
            username,
            password,
            name,
            email,
            DOB,
            status: "Đăng ký thành công",
            success: true,
        });
    } else {
        res.render("register", {
            style: "register",
            title: "Register",
            username,
            password,
            name,
            email,
            DOB,
            status: "Username đã tồn tại, vui lòng chọn username khác",
            success: false,
        });
    }
};

exports.logOut = (req, res) => {
    delete req.session.user;
    delete req.session.remember;
    res.redirect("login");
};

exports.AddFavorite = async (req, res) => {
    if (!req.session.user) res.render("login", { style: "login", title: "login" });
    else {
        const user = await userModel.getUserById(req.session.user);
        const movie = await moviesModel.getMovieByID(req.params.id);
        if (req.body.status == "true") {
            await insertFavorite(movie, user);
        } else {
            await deleteFavorite(movie, user);
        }
        res.redirect("back");
    }
};

exports.getFavoriteMovie = async (req, res) => {
    const page = req.query.page || 1;
    if (!req.session.user) {
        res.redirect("/user/login");
    } else {
        const user = await userModel.getUserById(req.session.user);
        const data = await userModel.getFavoriteMovie(user, page);

        res.render("favorite", {
            helpers: homeHps,
            name: user.name,
            movies: data.data,
            page: data.page,
            totalPageMovie: data.pageTotal,
        });
    }
};
