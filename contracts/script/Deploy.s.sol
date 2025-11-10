// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/ProfileTicket.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address treasury = vm.envAddress("TREASURY");

        vm.startBroadcast(deployerKey);
        new ProfileTicket(treasury);
        vm.stopBroadcast();
    }
}
