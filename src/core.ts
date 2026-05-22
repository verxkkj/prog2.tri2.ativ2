import { Database } from "bun:sqlite";

// class Item_ {
//   public title: string
//   constructor(title: string) {
//     this.title = title
//   }
// }

const db = new Database("database.sqlite")

db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL
  )
`)

const querySelectItems = db.prepare("SELECT * FROM items")
const queryInsertItem = db.prepare("INSERT INTO items (title) VALUES (?)")
const queryDeleteItem = db.prepare("DELETE FROM items WHERE id = ?")
const queryUpdateItem = db.prepare("UPDATE items SET title = ? WHERE id = ?")

class Item {
  constructor(public title: string) { }
}


class TodoList {
  private items: Item[] = []

  addItem(item: Item) {
    this.items.push(item)
    queryInsertItem.run(item.title)
  }

  removeItem(index: number) {
    const item = this.items[index]
  if (index < 0 || index > this.items.length) 
      throw new Error('Index out of bounds');
    queryDeleteItem.run(item?.title as string)
      this.items.splice(index, 1)
  }
  
  updateItem(index: number, newTitle: string) {
    if (index < 0 || index >= this.items.length)
      throw new Error('Index out of bounds');
    queryUpdateItem.run(newTitle, index)
  }
  getItems() {
    const items = querySelectItems.all()
    return items
  }
}

//
// exemplo [ [ [ NÃO COPIEM ] ] ] 
//

const lista = new TodoList()
lista.addItem(new Item("ficar quieto"))
lista.addItem(new Item("prestar atenção"))
lista.addItem(new Item("aprender typescript"))
console.log(lista.getItems())

// Atividades
// 1. permitir trocar ordem dos itens