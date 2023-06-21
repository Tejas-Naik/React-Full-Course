import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  const handleClearList = function () {
    const shouldClear = window.confirm("Are you sure you want to delete the entire list?");
    if (shouldClear) {
      setItems([]);
    }
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}





