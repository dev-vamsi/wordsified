const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();
const dbConnect = require("./db/dbConnect");
const auth = require("./middlewares/auth");

async function start() {
    await dbConnect();

    app.use(
        require("cors")({
            origin: "*",
        })
    );
    app.use(express.json());
    app.use("/auth", require("./routes/user.route"));
    app.use("/words", auth, require("./routes/words.route"));

    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
}

start();
