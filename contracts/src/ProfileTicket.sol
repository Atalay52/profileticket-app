// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ProfileTicket {
    IERC20 public usdc = IERC20(0x036CbD53842c5426634e7929541eC2318f3dCF7e); // Base Sepolia USDC
    address public protocol = 0xd5bf20868ea746692f04c7337bb9561b191627a1;
    address public treasury;

    struct Profile {
        uint256 totalTickets;
        uint256 basePrice;   // 0.01 USDC = 10000 (6 decimal)
        uint256 stepPrice;   // 0.0005 USDC = 500
        address owner;
    }

    mapping(string => Profile) public profiles;
    mapping(string => mapping(address => uint256)) public holdings;

    constructor(address _treasury) {
        treasury = _treasury;
    }

    function buy(string memory username, uint256 amount) external {
        Profile storage p = _getOrCreate(username);
        uint256 totalCost = 0;

        for (uint256 i = 0; i < amount; i++) {
            uint256 price = p.basePrice + (p.totalTickets + i) * p.stepPrice;
            totalCost += price;

            uint256 toProtocol = (price * 50) / 1000;  // %5
            uint256 toOwner = (price * 25) / 1000;     // %2.5
            uint256 toTreasury = price - toProtocol - toOwner;

            usdc.transferFrom(msg.sender, protocol, toProtocol);
            usdc.transferFrom(msg.sender, p.owner, toOwner);
            usdc.transferFrom(msg.sender, treasury, toTreasury);
        }

        p.totalTickets += amount;
        holdings[username][msg.sender] += amount;
    }

    function _getOrCreate(string memory username) internal returns (Profile storage) {
        if (profiles[username].owner == address(0)) {
            profiles[username] = Profile(0, 10000, 500, msg.sender);
        }
        return profiles[username];
    }
}
