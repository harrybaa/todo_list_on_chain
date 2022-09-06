//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// We import this library to be able to use console.log
import "hardhat/console.sol";

contract Greeting {
    string public greet = "";

    constructor() {
        greet = "hello, user";
    }

    function getGreet() external view returns (string memory) {
        return greet;
    }
}