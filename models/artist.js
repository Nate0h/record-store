const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
});

ArtistSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`;
  }

  return fullname;
});

ArtistSchema.virtual("url").get(function () {
  return `/catalog/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", AuthorSchema);
