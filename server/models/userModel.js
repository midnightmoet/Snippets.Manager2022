const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
<<<<<<< HEAD
  {
    // the email is unique and required for registering/logging in
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
=======
    {
        email: { type: String, required: true },
        password: { type: String, required: true },

    },
    {
        timestamps: true,
    }
>>>>>>> master
);

const User = mongoose.model("user", userSchema);

module.exports = User;