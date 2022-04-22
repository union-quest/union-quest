// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./UnionQuestVillage.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract UnionQuestCore is ERC1155, ERC1155Burnable, AccessControl {
    struct ItemType {
        string name;
        string description;
        uint256 buyPrice;
        uint256 sellPrice;
    }

    struct Village {
        string name;
        string description;
        UnionQuestVillage member;
    }

    struct Player {
        uint256 x;
        uint256 y;
    }

    address marketRegistry;
    address unionToken;
    address underlyingToken;

    ItemType[] private itemTypes;
    mapping(address => Player) private players;
    mapping(uint256 => mapping(uint256 => Village)) private villages;

    event AddItemType(uint256 _index, ItemType _itemType);

    constructor(
        address _marketRegistry,
        address _unionToken,
        address _underlyingToken
    ) ERC1155("") {
        marketRegistry = _marketRegistry;
        unionToken = _unionToken;
        underlyingToken = _underlyingToken;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addItemTypes(ItemType[] memory _itemTypes) external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i; i < _itemTypes.length; i++) {
            itemTypes.push(_itemTypes[i]);
            emit AddItemType(itemTypes.length - 1, _itemTypes[i]);
        }
    }

    function createVillage(
        uint256 x,
        uint256 y,
        string calldata name,
        string calldata description
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        villages[x][y].name = name;
        villages[x][y].description = description;

        villages[x][y].member = new UnionQuestVillage(marketRegistry, unionToken, underlyingToken);
    }

    function move(uint256 x, uint256 y) external {
        Player storage player = players[msg.sender];

        player.x = x;
        player.y = y;
    }

    function buyItem(
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        Player storage player = players[msg.sender];
        require(address(villages[player.x][player.y].member) != address(0), "Player is not in village.");

        // Get the buy price from the Item Manager
        uint256 total = itemTypes[id].buyPrice * amount;

        // Transfer DAI to village and stake in Union
        ERC20(underlyingToken).transferFrom(msg.sender, address(this), total);
        UnionQuestVillage(villages[player.x][player.y].member).stake(total);

        // Mint the user their item
        _mint(msg.sender, id, amount, data);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
