import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import "./App.css";
import Item from "./Item";
import NewItem from "./NewItem";
import contractGreetArtifact from "./contracts/Greeting.json";
import contractTodoListArtifact from "./contracts/TodoList.json";
import contractAddress from "./contracts/contract-address.json";

const HARDHAT_NETWORK_ID = "1337";

// const initList = [
//   {
//     id: 1,
//     desc: "Wake up and grab a cup of coffee.",
//     completed: true,
//   },
//   {
//     id: 2,
//     desc: "Turn on the morning news and brush teeth.",
//     completed: false,
//   },
//   {
//     id: 3,
//     desc: "Meditation.",
//     completed: false,
//   },
// ];

function App() {
  let _provider = useRef(null); // ethers provider
  let _contractGreet = useRef(null); // contract greet
  let _contractTodoList = useRef(null); // contract todo list
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (selectedAddress) {
      console.log("Connected to wallet: " + selectedAddress);
    }

    if (!checkNetwork()) {
      return;
    }

    initEthers(selectedAddress);

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      if (newAddress !== undefined) {
        initEthers(newAddress);
      }
    });
  };

  const initEthers = () => {
    _provider.current = new ethers.providers.Web3Provider(window.ethereum);

    _contractGreet.current = new ethers.Contract(
      contractAddress.Greeting,
      contractGreetArtifact.abi,
      _provider.current.getSigner(0)
    );

    _contractTodoList.current = new ethers.Contract(
      contractAddress.TodoList,
      contractTodoListArtifact.abi,
      _provider.current.getSigner(0)
    );

    getGreet();
    getTodoList();
  };

  const getGreet = async () => {
    const greet = await _contractGreet.current.getGreet();
    console.log(greet);
  };

  const getTodoList = async () => {
    const todoListData = await _contractTodoList.current.fetchItems();
    console.log("todoListData: " + todoListData);
    setItemList(todoListData)
  }

  const onSubmitNewItem = async (desc) => {
    const newItemList = itemList.slice(0);
    const newItem = {
      id: newItemList.length + 1,
      desc,
      completed: false,
    };
    debugger
    await _contractTodoList.current.pushItem(newItem.desc, newItem.completed);

    newItemList.push(newItem);

    setItemList(newItemList);
  };

  const checkNetwork = () => {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }
    return false;
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
