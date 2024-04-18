const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
  summary: { type: String, required: true },
  upc: { type: Number, min: 100000000000, max: 999999999999, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for book's URL
AlbumSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/album/${this._id}`;
});

// Export model
module.exports = mongoose.model("Album", AlbumSchema);
