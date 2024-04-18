const Album = require("../models/album");
const Artist = require("../models/artist");
const Genre = require("../models/genre");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numAlbums, numArtists, numGenres] = await Promise.all([
    Album.countDocuments({}).exec(),
    Artist.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Nate-O's Record Store",
    album_count: numAlbums,
    artist_count: numArtists,
    genre_count: numGenres,
  });
});

exports.album_list = asyncHandler(async (req, res, next) => {
  const allAlbums = await Album.find({}, "title artist")
    .sort({ title: 1 })
    .populate("artist")
    .exec();

  res.render("album_list", { title: "Album List", album_list: allAlbums });
});

// Display detail page for a specific album.
exports.album_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: album detail: ${req.params.id}`);
});

// Display album create form on GET.
exports.album_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album create GET");
});

// Handle album create on POST.
exports.album_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album create POST");
});

// Display album delete form on GET.
exports.album_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album delete GET");
});

// Handle album delete on POST.
exports.album_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album delete POST");
});

// Display album update form on GET.
exports.album_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album update GET");
});

// Handle album update on POST.
exports.album_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album update POST");
});
