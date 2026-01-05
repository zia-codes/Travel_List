import { useState } from "react"; // import useState hook from React
import "./index.css"; // import CSS for styling
import Logo from "./components/Logo.jsx"; // import Logo component
import Form from "./components/Form.jsx"; // import Form component
import PackingList from "./components/PackingList.jsx";
import Stats from "./components/Stats.jsx";

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
    SetItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    // Function to toggle the 'packed' status of an item
    SetItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    // Function to clear the entire packing list
    if (items.length === 0) return; // do nothing if list is already empty
    const confirm = window.confirm(
      "Are you sure you want to clear the entire list?"
    );
    if (confirm) SetItems([]); // reset items to an empty array
  }

  return (
    <div className="app">
      <Logo /> {/* Displays app logo/header */}
      <Form handleAddItem={handleAddItem} /> {/* Form to add new items */}
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />{" "}
      {/* Displays list of items */}
      <Stats items = {items}/> {/* Footer showing stats (currently static) */}
    </div>
  );
}





