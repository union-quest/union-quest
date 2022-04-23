// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@unioncredit/v1-sdk/contracts/interfaces/IUserManager.sol";

contract UserManager {
    event LogUpdateTrust(address indexed staker, address indexed borrower, uint256 trustAmount);

    /**
     *  @dev Stake
     *  @param amount Amount
     */
    function stake(uint256 amount) external {}

    function updateTrust(address account, uint256 amount) external {
        emit LogUpdateTrust(msg.sender, account, amount);
    }
}
