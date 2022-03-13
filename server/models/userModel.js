const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // the email is unique and required for registering/logging in
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;