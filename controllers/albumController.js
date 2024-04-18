const album = require("../models/album");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all albums.
exports.album_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album list");
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
