const { Schema, model } = require("mongoose");

const userSchema = new Schema({

})

const userModel = model("user", userSchema);

module.exports = userModel;