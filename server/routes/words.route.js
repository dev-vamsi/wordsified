const router = require("express").Router();
const UserModel = require("../models/user.model");

router.route("/add").post(async (req, res) => {
    if (!req.body.word || !req.body.meaning) {
        return res.status(400).json({
            ok: false,
            message: "word and meaning are required fields.",
        });
    }

    const { word, meaning } = req.body;
    try {
        const { email } = req.user;
        await UserModel.updateOne(
            { email },
            { $push: { words: { word, meaning } } }
        );
        return res
            .status(200)
            .json({ ok: true, message: "Successfully updated new word." });
    } catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "Internal Server Error" });
    }
});

router.route("/define/:word").get(async (req, res) => {
    try {
        const { email } = req.user;
        const { words } = await UserModel.findOne({ email });
        const _res = words.find((_word) => _word.word === req.params.word);
        if (_res) {
            return res.status(200).json({
                ok: true,
                word: _res.word,
                meaning: _res.meaning,
            });
        }
        return res
            .status(404)
            .json({ ok: false, message: "Word doesn't exists in your db!" });
    } catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "Internal Server Error" });
    }
});

router.route("/all").get(async (req, res) => {
    try {
        const { email } = req.user;
        const { words } = await UserModel.findOne({ email });
        return res.status(200).json({ ok: true, words });
    } catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "Internal Server Error" });
    }
});

router.route("/delete/:word").delete(async (req, res) => {
    try {
        const { email } = req.user;
        let { words } = await UserModel.findOne({ email });
        words = words.filter((_w) => _w.word !== req.params.word);
        await UserModel.updateOne({ email }, { $set: { words: words } });
        return res.status(200).json({ ok: true, words });
    } catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "Internal Server Error" });
    }
});

module.exports = router;
