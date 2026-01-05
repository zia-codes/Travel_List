export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)} />
      {/* Display quantity and description */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* Delete button (not functional yet) */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
