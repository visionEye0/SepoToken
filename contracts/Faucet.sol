// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    IERC20 public token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function requestTokens() public {
        token.transfer(msg.sender, 100 * 10 ** 18); // send 100 tokens
    }
}
