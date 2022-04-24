// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@unioncredit/v1-sdk/contracts/UnionVoucher.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UnionQuestVillage is UnionVoucher, Ownable {
    constructor(
        address _marketRegistry,
        address _unionToken,
        address _underlyingToken
    ) BaseUnionMember(_marketRegistry, _unionToken, _underlyingToken) {}

    function stake(uint256 amount) external {
        _stake(amount);
    }

    function updateTrust(address borrower_, uint256 trustAmount) external onlyOwner {
        _updateTrust(borrower_, trustAmount);
    }
}
