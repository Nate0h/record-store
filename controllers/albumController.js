const Album = require("../models/album");
const Artist = require("../models/artist");
const Genre = require("../models/genre");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  // Get details of books, book instances for specific book
  const album = await Album.findById(req.params.id)
    .populate("artist")
    .populate("genre")
    .exec();

  if (album === null) {
    // No results.
    const err = new Error("Album not found");
    err.status = 404;
    return next(err);
  }

  res.render("album_detail", {
    title: album.title,
    album: album,
  });
});

// Display book create form on GET.
exports.album_create_get = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  const [allArtists, allGenres] = await Promise.all([
    Artist.find().sort({ name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);

  res.render("album_form", {
    title: "Create Album",
    artists: allArtists,
    genres: allGenres,
  });
});

// Handle book create on POST.
exports.album_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("artist", "Artist must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("upc", "UPC must not be 12 digits")
    .trim()
    .isNumeric()
    .isInt({ min: 100000000000, max: 999999999999 })
    .escape(),
  body("genre").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const album = new Album({
      title: req.body.title,
      artist: req.body.artist,
      summary: req.body.summary,
      upc: req.body.upc,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all artists and genres for form.
      const [allArtists, allGenres] = await Promise.all([
        Artist.find().sort({ name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);

      res.render("album_form", {
        title: "Create Album",
        artists: allArtists,
        genres: allGenres,
        album: album,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await album.save();

      res.redirect(album.url);
    }
  }),
];

// Display album delete form on GET.
exports.album_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const album = await Album.findById(req.params.id)
    .populate("artist")
    .populate("genre")
    .exec();

  if (album === null) {
    res.redirect("/catalog/albums");
  }

  res.render("album_delete", {
    title: album.title,
    album: album,
  });
});

// Handle album delete on POST.
exports.album_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const album = await Album.findById(req.params.id)
    .populate("artist")
    .populate("genre")
    .exec();

  if (album === null) {
    // Author has books. Render in same way as for GET route.
    res.render("album_delete", {
      title: "Delete Album",
      album: album,
    });
    return;
  } else {
    // Author has no books. Delete object and redirect to the list of authors.
    await Album.findByIdAndDelete(req.body.albumid);
    res.redirect("/catalog/albums");
  }
});
// Display album update form on GET.
exports.album_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album update GET");
});

// Handle album update on POST.
exports.album_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album update POST");
});
