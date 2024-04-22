#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Album = require("./models/album");
const Artist = require("./models/artist");
const Genre = require("./models/genre");

const genres = [];
const artists = [];
const albums = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createArtists();
  await createAlbums();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name, description) {
  const genre = new Genre({ name: name, description: description });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function artistCreate(index, name, image) {
  const artistdetail = { name: name, image: image };

  const artist = new Artist(artistdetail);

  await artist.save();
  artists[index] = artist;
  console.log(`Added artist: ${name}`);
}

async function albumCreate(
  index,
  title,
  artist,
  summary,
  genre,
  price,
  total_items,
  image
) {
  const albumdetail = {
    title: title,
    summary: summary,
    artist: artist,
    genre: genre,
    price: price,
    total_items: total_items,
    image: image,
  };

  const album = new Album(albumdetail);
  await album.save();
  albums[index] = album;
  console.log(`Added album: ${title}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(
      0,
      "Hip Hop",
      "Hip-hop or hip hop music, is a genre of popular music that originated in the early 1970s by African Americans and Caribbean immigrants in the Bronx."
    ),
    genreCreate(
      1,
      "Pop",
      "Pop music is a type of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom. "
    ),
    genreCreate(
      2,
      "R&B",
      "Rhythm and blues, frequently abbreviated as R&B or R'n'B, is a genre of popular music that originated within African-American communities in the 1940s."
    ),
  ]);
}

async function createArtists() {
  console.log("Adding artists");
  await Promise.all([
    artistCreate(0, "Kanye West", "kanye.jpeg"),
    artistCreate(1, "Drake", "drake.jpeg"),
    artistCreate(2, "Taylor Swift", "taylor.jpeg"),
    artistCreate(3, "Rihanna", "rihanna.jpeg"),
    artistCreate(4, "Beyonce", "beyonce.jpg"),
    artistCreate(5, "Usher", "usher.jpeg"),
  ]);
}

async function createAlbums() {
  console.log("Adding Albums");
  await Promise.all([
    albumCreate(
      0,
      "Graduation",
      artists[0],
      "Kanye West's third studio album, 'Graduation,' diverges from his earlier soul and orchestral influences, embracing electronic sounds inspired by stadium tours, indie rock, and house music. Lyrically, West reflects on fame and media scrutiny while experimenting with synthesizer layering to craft a new sonic landscape.",
      genres[0],
      10,
      20,
      "graduation.jpeg"
    ),
    albumCreate(
      1,
      "For All the Dogs",
      artists[1],
      "Drake's eighth studio album, 'For All the Dogs,' was preceded by teasers linked to his book, 'Titles Ruin Everything,' and showcased a return to his classic style amid criticism of his previous house-influenced work. ",
      genres[0],
      17,
      8,
      "forallthedogs.jpeg"
    ),
    albumCreate(
      2,
      "Midnights",
      artists[2],
      "Taylor Swift's tenth studio album, 'Midnights,' was announced with a surprise reveal during her VMAs acceptance speech and features 13 tracks inspired by sleepless nights in her life, released in multiple cover variants including a special edition with Target. ",
      genres[1],
      32,
      3,
      "midnights.jpeg"
    ),
    albumCreate(
      3,
      "Anti",
      artists[3],
      "Rihanna's eighth studio album 'Anti,' released in 2016 after a premature leak on TIDAL, showcases a departure from her pop and club sound, aiming for timeless, soulful music, embodying her desire for authenticity and defying expectations.",
      genres[1],
      15,
      21,
      "anti.jpeg"
    ),
    albumCreate(
      4,
      "Lemonade",
      artists[4],
      "'Lemonade' is a deeply personal testament describing Queen Bey's discovery that her husband had been unfaithful. During its twelve songs we accompany Beyoncé on her journey from denial and anger to emptiness and apathy, forgiveness and redemption. It's also a manifesto of personal creativity.",
      genres[2],
      11,
      7,
      "lemonade.jpeg"
    ),
    albumCreate(
      5,
      "Confessions",
      artists[5],
      "This is Usher’s breakout, and considered by many his best album to date. The lead single, “Yeah!” is his most successful even today, and is just a taste of what this masterpiece has to offer.",
      genres[2],
      13,
      14,
      "confessions.jpeg"
    ),
  ]);
}
