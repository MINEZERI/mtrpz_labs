import express, { Request, Response } from "express";
import path from "path";
import { pool, initDB } from "./db.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// NEW CODE

// Middleware
app.use(express.json());
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../views"),
  ),
);

// DB initialization
initDB();

app.get("/", (req: Request, res: Response) => {
  console.log("HTML");
  res.sendFile(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "views",
      "index.html",
    ),
  );
});

// CRUD Routes
app.get("/api/task", async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    "SELECT * FROM Task ORDER BY created_at DESC",
  );
  res.json(rows);
});

app.post("/api/task", async (req: Request, res: Response) => {
  const { description } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO Task (description) VALUES ($1) RETURNING *",
    [description],
  );
  res.status(201).json(rows[0]);
});

app.delete("/api/task/:id", async (req: Request, res: Response) => {
  await pool.query("DELETE FROM Task WHERE id = $1", [req.params.id]);
  res.sendStatus(204);
});

app.patch("/api/task/:id", async (req: Request, res: Response) => {
  const { completed } = req.body;
  const { rows } = await pool.query(
    "UPDATE Task SET completed = $1 WHERE id = $2 RETURNING *",
    [completed, req.params.id],
  );
  res.json(rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
