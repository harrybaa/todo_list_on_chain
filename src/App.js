import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Item from "./Item";
import NewItem from "./NewItem";

function App() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const initList = [
      {
        id: 1,
        desc: "Wake up and grab a cup of coffee.",
        completed: true,
      },
      {
        id: 2,
        desc: "Turn on the morning news and brush teeth.",
        completed: false,
      },
      {
        id: 3,
        desc: "Meditation.",
        completed: false,
      },
    ];
    setItemList(initList);
  }, []);

  const onSubmitNewItem = (desc) => {
    const newItemList = itemList.slice(0);
    newItemList.push({
      id: newItemList.length + 1,
      desc,
      completed: false,
    });

    setItemList(newItemList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>My Todo List On Chain</code>
        </p>
      </header>

      {itemList.map((item, index) => (
        <Item
          desc={item.desc}
          completed={item.completed}
          id={item.id}
          key={item.id}
        ></Item>
      ))}

      <NewItem onSubmitNewItem={onSubmitNewItem} />
    </div>
  );
}

export default App;
