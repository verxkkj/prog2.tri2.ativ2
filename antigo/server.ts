import express from "express"
import sqlite3 from "sqlite3"
import { open } from "sqlite"

import {
  addItem,
  getItems,
  deleteItem,
  updateItem
} from "./core.js"

const app = express()

app.use(express.json())
app.use(express.static("public"))

const db = await open({
  filename: "./database.db",
  driver: sqlite3.Database
})

await db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  )
`)

// GET
app.get("/tasks", async (req, res) => {
  const tasks = await getItems()

  res.json(tasks)
})

// POST
app.post("/tasks", async (req, res) => {
  const task = await addItem(req.body.title)

  res.json(task)
})

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  await deleteItem(Number(req.params.id))

  res.json({ success: true })
})

// PUT
app.put("/tasks/:id", async (req, res) => {
  const task = await updateItem(
    Number(req.params.id),
    req.body.title
  )

  res.json(task)
})

app.listen(3000, () => {
  console.log("Servidor rodando")
})