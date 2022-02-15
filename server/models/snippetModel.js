const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: { type: String, required: true },
    code: {type: String, required: true}
}, {
    timestamps: true
});

const Snippet = mongoose.model("snippet", snippetSchema);

module.exports = Snippet;