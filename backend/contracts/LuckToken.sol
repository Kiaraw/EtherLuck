// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuckToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("EtherLuck Token", "ELK") {
        // initialSupply est en WEI (10**18)
        _mint(msg.sender, initialSupply);
    }
}
