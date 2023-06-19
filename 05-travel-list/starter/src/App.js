import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => {
    setItems(items => [...items, item]);
  }

  const handleDelete = function (id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  const handleToggleItem = function (id) {
    setItems(items => items
      .map(item =>
        item.id === id ?
          { ...item, packed: !item.packed }
          : item
      ));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description') {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === 'packed') {
    sortedItems = items.slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  console.log(items);

  return (
    <div className="list">
      <ul>
        {
          sortedItems.map(item =>
            <Item
              key={item.id}
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />)
        }
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  )
};

function Item({ item, onDeleteItem, onToggleItem }) {
  return <li>
    <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
}

function Stats({ items }) {

  if (!items.length) {
    return (
      <p className="stats">
        Start adding some items to your packing list 🚀.
      </p>
    )
  }

  const numItems = items.length;
  let packed = items.filter(item => item.packed).length;
  const percentage = (packed * 100) / numItems;

  return <footer className="stats">
    <em>
      {percentage === 100 ?
        "You got everything. Ready to go 🛫."
        :
        `You have ${numItems} items in your list, and you already packed ${packed} (${percentage}%).`
      }</em>

  </footer>
};