import React, { useState } from "react";

export default function CinemaTable({
  getValues,
}: {
  getValues: (items: Array<{ id: string; numCols: number; price: number }>) => void;
}) {
  const [items, setItems] = useState<Array<{ id: string; numCols: number; price: number }>>([]);

  function handleClick() {
    setItems([...items, { id: items.length.toString(), numCols: 0, price: 0 }]);
  }

  function handleColumnChanged(i: number, event: any) {
    const newItems = [...items];
    newItems[i] = { id: (i + 1).toString(), numCols: parseInt(event.target.value), price: newItems[i].price };
    setItems(newItems);
  }

  function handlePriceChanged(i: number, event: any) {
    const newItems = [...items];
    newItems[i] = { id: (i + 1).toString(), numCols: newItems[i].numCols, price: parseInt(event.target.value) };
    setItems(newItems);
  }

  function handleItemDeleted(i: number) {
    const newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  }

  function renderRows() {
    return items.map((o, i) => (
      <tr key={"item-" + i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4">
          <input
            type="number"
            max={10}
            min={1}
            name="columns"
            value={o.numCols}
            onChange={event => handleColumnChanged(i, event)}
            className="relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-100 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            min={0}
            name="price"
            value={o.price}
            onChange={event => handlePriceChanged(i, event)}
            className="relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-100 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
          />
        </td>
        <td className="px-6 py-4">
          <button onClick={() => handleItemDeleted(i)}>Delete</button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="relative flex flex-col justify-center items-center overflow-x-auto gap-5 sm:min-w-[632px]">
      <div className="flex justify-around items-center w-full">
        <button onClick={handleClick} className="px-3 py-1 bg-gray-700 rounded-md">
          Add Row
        </button>
        {items.length > 0 ? (
          <button
            onClick={() => {
              console.log({ items });
              getValues(items);
            }}
            className="px-3 py-1 bg-gray-700 rounded-md"
          >
            Generate Cinema Layout
          </button>
        ) : null}
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Number of columns
            </th>
            <th scope="col" className="px-6 py-3">
              Price per row
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      <hr />
      {/* <input type="text" value={message} onChange={updateMessage} /> */}
    </div>
  );
}
