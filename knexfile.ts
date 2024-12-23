import e from "express";

export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db",
  },
  useNullAsDefault: true,
  migrations: {
    extenions: "ts",
    directory: "./src/database/migrations",
  },
  seeds: {
    extenions: "ts",
    directory: "./src/database/seeds",
  },
};
