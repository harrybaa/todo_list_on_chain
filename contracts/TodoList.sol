//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// We import this library to be able to use console.log
import "hardhat/console.sol";

contract TodoList {
    struct ListItem {
        uint id;
        string desc;
        bool completed;
    }

    ListItem[] todoListData;

    constructor() {
        todoListData.push(
            ListItem(1, "Wake up and grab a cup of coffee.", true)
        );
        todoListData.push(
            ListItem(2, "Turn on the morning news and brush teeth.", false)
        );
        todoListData.push(ListItem(3, "Meditation.", false));
    }

    function fetchItems() external view returns (ListItem[] memory) {
        return todoListData;
    }

    function pushItem(string calldata s, bool b) public payable {
        todoListData.push(ListItem(todoListData.length + 1, s, b));
    }

    function updateItem(
        uint index,
        string calldata s,
        bool b
    ) public {
        ListItem storage item = todoListData[index];
        item.desc = s;
        item.completed = b;
    }
}
