import { useState } from "react";
import Item from "./Item";

// Component for displaying list of items
export default function PackingList({ items, handleDeleteItem, handleToggleItem, handleClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items.slice();
  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul className="list">
        {/* Loop over items and render Item component for each */}
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
            key={item.id} />
        ))}
      </ul>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={handleClearList}>Clear list</button>
    </div>
  );
}
