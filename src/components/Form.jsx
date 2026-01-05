import { useState } from "react"; // import useState hook from React
// Form component for adding items
export default function Form({ handleAddItem }) {
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