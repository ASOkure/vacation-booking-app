const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();
const verifyToken = require("../middlewares/verify-token");
router.get("/", (req, res, next) => {
  const db = new sqlite3.Database("./db.sqlite");
  db.serialize(() => {
    db.all(
      `
      SELECT
        bookings.*,
        catalog_items.name AS catalog_item_name,
        catalog_items.description AS catalog_item_description
      FROM bookings
      INNER JOIN catalog_items ON catalog_items.id = 
        bookings.catalog_item_id
    `,
      [],
      (err, rows = []) => {
        res.json(rows);
      }
    );
  });
  db.close();
});
