// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IUnionQuestCore {
    struct ItemType {
        string name;
        string description;
        uint256 buyPrice;
        uint256 sellPrice;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) external;

    function getItemType(uint256 tokenId) external view returns (ItemType memory);
}
