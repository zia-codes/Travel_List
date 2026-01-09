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
      <Stats items={items} /> {/* Footer showing stats (currently static) */}
      <Accordion faqs={faqs} />
    </div>
  );
}

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: " Our chairs are assembled in our state-of-the-art facility located in Springfield, USA",
  },
  {
    title: "What is the warranty period for these chairs?",
    text: "All our chairs come with a standard two-year warranty covering manufacturing defects and workmanship issues.",
  },
  {
    title: "Do you offer customization options for the chairs?",
    text: "Yes, we offer a range of customization options including fabric choices, colors, and additional features to suit your preferences.",
  },
];

function Accordion({ faqs }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div>
      {faqs.map((el, index) => (
        <AccordionItem
          curOpen={curOpen}
          setCurOpen={setCurOpen}
          num={index + 1}
          title={el.title}
        >
          {el.text}
        </AccordionItem>
      ))}
      <AccordionItem
        curOpen={curOpen}
        setCurOpen={setCurOpen}
        num={22}
        title="test 1"
      >
        <p><b>Allows React developers to:</b></p>
        <ul>
          <li>Break up UI into components </li>
          <li>Make components reusable</li>
          <li>Place state efficiently</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ curOpen, setCurOpen, num, title, children }) {
  const isOpen = curOpen === num;
  function handleToggle() {
    setCurOpen(isOpen ? null : num);
  }
  return (
    <div onClick={handleToggle}>
      <p>{num < 9 ? `0${num}` : num}</p>
      <h2>{title}</h2>
      <p>{isOpen ? "-" : "+"}</p>
      {isOpen && <div>{children}</div>}
    </div>
  );
}
