const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  image: { type: String },
});

ArtistSchema.virtual("url").get(function () {
  return `/catalog/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", ArtistSchema);
