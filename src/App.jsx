import { useState } from 'react';

/* eslint-disable react/prop-types */
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackagingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function randomID() {
  let array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0];
}

function Form() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handledSubmit(event) {
    event.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: randomID() };
    console.log(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handledSubmit}>
      <h3>What do you need for your trip?</h3>
      <select name='form' id='add-form' value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackagingList() {
  return (
    <div className='list'>
      <ul>
        {initialItems.map((item) => (
          <Item elements={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ elements }) {
  return (
    <li>
      <span style={elements.packed ? { textDecoration: 'line-through' } : {}}>
        {elements.quantity} {elements.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      <em>You have X items on your list</em>
    </footer>
  );
}
