const Artist = require("../models/artist");
const Album = require("../models/album");
const asyncHandler = require("express-async-handler");

// Display list of all Authors.
exports.artist_list = asyncHandler(async (req, res, next) => {
  const allArtists = await Artist.find().sort({ name: 1 }).exec();
  res.render("artist_list", {
    title: "Artist List",
    artist_list: allArtists,
  });
});

// Display detail page for a specific Author.
exports.artist_detail = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [artist, allAlbumsByArtist] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Album.find({ artist: req.params.id }, "title summary").exec(),
  ]);

  if (artist === null) {
    // No results.
    const err = new Error("Artist not found");
    err.status = 404;
    return next(err);
  }

  res.render("artist_detail", {
    title: "Artist Detail",
    artist: artist,
    artist_albums: allAlbumsByArtist,
  });
});

// Display artist create form on GET.
exports.artist_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist create GET");
});

// Handle artist create on POST.
exports.artist_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist create POST");
});

// Display artist delete form on GET.
exports.artist_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist delete GET");
});

// Handle artist delete on POST.
exports.artist_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist delete POST");
});

// Display artist update form on GET.
exports.artist_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist update GET");
});

// Handle artist update on POST.
exports.artist_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist update POST");
});
