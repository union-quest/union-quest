// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IUnionQuestCore.sol";

import "@unioncredit/v1-sdk/contracts/UnionVoucher.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UnionQuestVillage is UnionVoucher, Ownable {
    IUnionQuestCore public unionQuest;

    constructor(
        address _marketRegistry,
        address _unionToken,
        address _underlyingToken
    ) BaseUnionMember(_marketRegistry, _unionToken, _underlyingToken) {
        unionQuest = IUnionQuestCore(msg.sender);
    }

    function register() external {
        _withdrawRewards();
        _registerMember();
    }

    function stake(uint256 amount) external {
        _stake(amount);
    }

    function unstake(uint256 amount) external onlyOwner {
        _unstake(amount);
    }

    function transferUnderlying(address to, uint256 amount) external onlyOwner {
        underlyingToken.transfer(to, amount);
    }
}
