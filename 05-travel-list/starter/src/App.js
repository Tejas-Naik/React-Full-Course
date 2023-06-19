import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems(items => [...items, item]);
  }

  const handleDelete = function (id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDelete} />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>
};

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(), description, quantity, packed: false,
    }

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map(num =>
            <option value={num} key={num}>{num}</option>)
        }
      </select>

      <input
        placeholder="Item..."
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>)
};

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {
          items.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />)
        }
      </ul>
    </div>
  )
};

function Item({ item, onDeleteItem }) {
  return <li>
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
}

function Stats() {
  return <footer className="stats">
    <em>You have 6 items in your list, and you already packed X (X%)</em>
  </footer>
};