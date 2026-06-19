import sqlite3 from "sqlite3"
import { open } from "sqlite"

const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database
})

// ADD ITEM
export async function addItem(title: string) {
  const db = await dbPromise

  const result = await db.run(
    "INSERT INTO tasks (title) VALUES (?)",
    [title]
  )

  return {
    id: result.lastID,
    title
  }
}

// GET ITEMS
export async function getItems() {
  const db = await dbPromise

  const tasks = await db.all(
    "SELECT * FROM tasks"
  )

  return tasks
}

// DELETE ITEM
export async function deleteItem(id: number) {
  const db = await dbPromise

  await db.run(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  )

  return { success: true }
}

// UPDATE ITEM
export async function updateItem(
  id: number,
  title: string
) {
  const db = await dbPromise

  await db.run(
    "UPDATE tasks SET title = ? WHERE id = ?",
    [title, id]
  )

  return {
    id,
    title
  }
}