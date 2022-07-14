require("dotenv").config();

const Typesense = require("typesense");

const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w300";

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "books",
    num_documents: 0,
    fields: [
      {
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "price",
        type: "string",
        facet: true,
      },
      {
        name: "info",
        type: "string",
        facet: true,
      },
      {
        name: "image",
        type: "string",
        facet: true,
      },
      {
        name: "storeName",
        type: "string",
        facet: false,
      },
    ],
    // default_sorting_field: "popularity",
  };

  const books = require("./data/products.json");

  try {
    const collection = await typesense.collections("books").retrieve();
    console.log("Found existing collection of books");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== books.length) {
      console.log("Collection has different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("books").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection...");

  books.forEach(async (book) => {
    book.image = book.image_path;

    // delete book.image_path;
    // delete book.original_language;
    // delete book.original_title;
    // delete book.video;
    // delete book.backdrop_path;
    // delete book.vote_count;
    // delete book.id;
    // delete book.adult;
    // delete book.genre_ids;

    // book.genres.forEach((genre, idx) => {
    //   book[`genres.lvl${idx}`] = [book.genres.slice(0, idx + 1).join(">")];
    // });

    //[Science Fiction], [Science Fiction > Action], [Science Fiction > Action > Adventure], [Science Fiction > Action > Adventure > Western]
  });

  try {
    const returnData = await typesense
      .collections("books")
      .documents()
      .import(books);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();
