import { useState } from "react"; // import useState hook from React
import "./index.css"; // import CSS for styling

export default function App() {
  // Main component holding the entire app
  const [items, SetItems] = useState([]); // state to store all packed items

  // Function to add new items to the state
  function handleAddItem(item) {
    // Use spread operator to add new item without mutating existing state
    SetItems((items) => [...items, item]);
  }
/*When this function runs, the app looks at all stored items one by one.
It keeps every item except the one whose id matches the given id, and saves this new list, so the deleted item disappears from the screen.*/

  function handleDeleteItem(id) {
    // Function to delete item by filtering it out based on ID
    SetItems(items => items.filter((item) => item.id !== id));
  }
   
  function handleToggleItem(id) {
    // Function to toggle the 'packed' status of an item
    SetItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  return (
    <div className="app">
      <Logo /> {/* Displays app logo/header */}
      <Form handleAddItem={handleAddItem} /> {/* Form to add new items */}
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem} /> {/* Displays list of items */}
      <Stats /> {/* Footer showing stats (currently static) */}
    </div>
  );
}

// Logo component
function Logo() {
  return <h1>🌴 Far Away 👜</h1>; // Simple heading/logo
}

// Form component for adding items
function Form({ handleAddItem }) {
  const [description, setDescription] = useState(""); // stores text typed by user
  const [quantity, setQuantity] = useState("1"); // stores selected quantity

  // Function triggered on form submission
  function handleSubmit(e) {
    e.preventDefault(); // prevents page reload on submit
    if (!description) return; // do nothing if input is empty

    // Create a new item object
    const newItem = {
      description,
      quantity,
      packed: false, // new items are unpacked by default
      id: Date.now(), // unique ID based on timestamp
    };
    console.log(newItem); // debug: log new item to console

    handleAddItem(newItem); // call parent function to add item to App state
    setDescription(""); // reset input field
    setQuantity(1); // reset quantity selection
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      {/* Quantity select dropdown */}
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {/* Generate numbers 1 to 20 dynamically */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Input field for item description */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Submit button */}
      <button>Add</button>
    </form>
  );
}

// Component for displaying list of items
function PackingList({ items, handleDeleteItem, handleToggleItem }) {
  return (
    <div className="list">
      <ul className="list">
        {/* Loop over items and render Item component for each */}
        {items.map((item) => (
          <Item item={item} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

// Component for individual item
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      {/* Display quantity and description */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description} 
      </span>
      {/* Delete button (not functional yet) */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// Footer component showing stats
function Stats() {
  return (
    <footer className="stats">
      👜 You have X items on your list, and you already packed{" "}
    </footer>
  );
}
