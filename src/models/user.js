const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});

const userModel = model("user", userSchema);

module.exports = userModel;
