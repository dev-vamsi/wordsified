const mongoose = require("mongoose");

const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL, {
        dbName: "wordified",
    });
    console.log("Successfully connected to Mongo Database...");
};

module.exports = dbConnect;
