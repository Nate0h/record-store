const Artist = require("../models/artist");
const Album = require("../models/album");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.artist_create_get = (req, res, next) => {
  res.render("artist_form", { title: "Create Artist" });
};

exports.artist_create_post = [
  upload.single("image"),
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const artist = new Artist({
      name: req.body.name,
      image: req.file ? req.file.filename : null,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("artist_form", {
        title: "Create Artist",
        artist: artist,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      await artist.save();

      res.redirect(artist.url);
    }
  }),
];

// Display Artist delete form on GET.
exports.artist_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [artist, allAlbumsByArtist] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Album.find({ artist: req.params.id }, "title summary").exec(),
  ]);

  if (artist === null) {
    // No results.
    res.redirect("/catalog/artists");
  }

  res.render("artist_delete", {
    title: "Delete Artist",
    artist: artist,
    artist_albums: allAlbumsByArtist,
  });
});

// Handle Artist delete on POST.
exports.artist_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [artist, allAlbumsByArtist] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Album.find({ artist: req.params.id }, "title summary").exec(),
  ]);

  if (allAlbumsByArtist.length > 0) {
    // Author has books. Render in same way as for GET route.
    res.render("artist_delete", {
      title: "Delete Artist",
      artist: artist,
      artist_albums: allAlbumsByArtist,
    });
    return;
  } else {
    // Author has no books. Delete object and redirect to the list of authors.
    await Artist.findByIdAndDelete(req.body.artistid);
    res.redirect("/catalog/artists");
  }
});

// Display artist update form on GET.
exports.artist_update_get = asyncHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id).exec();
  res.render("artist_form", { title: "Create Artist", artist: artist });
});

// Handle artist update on POST.
exports.artist_update_post = [
  upload.single("image"),
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const artist = new Artist({
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("artist_form", {
        title: "Update Artist",
        artist: artist,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      const updatedArtist = await Artist.findByIdAndUpdate(
        req.params.id,
        artist,
        {}
      );

      res.redirect(updatedArtist.url);
    }
  }),
];
