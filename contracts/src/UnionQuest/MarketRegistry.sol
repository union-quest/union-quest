// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@unioncredit/v1-sdk/contracts/interfaces/IMarketRegistry.sol";

contract MarketRegistry {
    address private manager;

    constructor(address _manager) {
        manager = _manager;
    }

    /**
     *  @dev Returns the market address of the token
     *  @return The market address
     */
    function tokens(address token) external view returns (address, address) {
        return (0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199, manager);
    }
}
