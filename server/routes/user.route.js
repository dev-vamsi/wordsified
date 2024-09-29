const router = require("express").Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/login").post(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            ok: false,
            status: "error",
            message: "email and password are required fields.",
        });
    }

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                ok: false,
                status: "error",
                message: "No user exists with given email.",
            });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({
                ok: false,
                status: "error",
                message: "Invalid password.",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
        );
        return res
            .status(200)
            .send({ message: "login successful", email, token });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
        });
    }
});

router.route("/signup").post(async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            ok: false,
            status: "error",
            message: "name, email and password are required fields.",
        });
    }

    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        console.log(result);
        return res.status(201).json({
            ok: true,
            userId: result._id,
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
        });
    }
});

module.exports = router;
