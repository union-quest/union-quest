// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@unioncredit/v1-sdk/contracts/UnionVoucher.sol";

contract UnionQuest is Context, ERC165, IERC1155MetadataURI, Ownable, UnionVoucher {
    using Address for address;

    uint256 private constant SPEED_DIVISOR = 10;
    uint256 private constant SKILL_INCREASE_DIVISOR = 10;
    uint256 private constant TRUST_MODIFIER = 0.01 ether;
    uint256 private constant MIN_SKILL = 1;
    uint256 private constant MAX_SKILL = 3;

    struct ItemType {
        string name;
        string description;
        string image;
        uint256 stake;
        uint256[] toolIds;
        uint256[] toolBonuses;
    }

    struct Recipe {
        uint256[] inputIds;
        uint256[] inputQuantities;
        uint256 output;
    }

    struct Player {
        int256 startX;
        int256 startY;
        int256 endX;
        int256 endY;
        uint256 startTimestamp;
    }

    ItemType[] private itemTypes;
    Recipe[] private recipes;

    mapping(address => Player) private players;
    mapping(address => mapping(uint256 => uint256)) private skills;
    mapping(uint256 => mapping(address => uint256)) private _balances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event AddItemType(uint256 _index, ItemType _itemType);
    event AddRecipe(uint256 _index, Recipe _recipe);
    event Move(address account, int256 x, int256 y);
    event IncreaseSkill(address indexed account, uint256 id, uint256 value);

    constructor(
        address _marketRegistry,
        address _unionToken,
        address _underlyingToken
    ) BaseUnionMember(_marketRegistry, _unionToken, _underlyingToken) {}

    function uri(uint256 id) external view virtual override returns (string memory) {
        ItemType storage item = itemTypes[id];

        return
            string(
                abi.encodePacked(
                    'data:text/plain,{"name":"',
                    item.name,
                    '","description":"',
                    item.description,
                    '","image":"data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">',
                    item.image,
                    '</svg>"}'
                )
            );
    }

    function balanceOf(address account, uint256 id) public view virtual override returns (uint256 balance) {
        require(account != address(0), "ERC1155: address zero is not a valid owner");

        balance = _balances[id][account];

        Player storage player = players[account];

        if (id == getItem(player.endX, player.endY)) {
            int256 vX = player.endX - player.startX;
            int256 vY = player.endY - player.startY;

            uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
            uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;

            if (distanceTravelled >= distanceNeeded) {
                uint256 skillIncrease = (miningBonus(account, id) *
                    (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR))) /
                    SKILL_INCREASE_DIVISOR;

                balance += skillIncrease * skills[_msgSender()][id] + (skillIncrease * skillIncrease) / 2;
            }
        }
    }

    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        public
        view
        virtual
        override
        returns (uint256[] memory)
    {
        require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[account][operator];
    }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: transfer caller is not owner nor approved"
        );
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = _msgSender();

        Player storage player = players[from];
        _move(_msgSender(), player.endX, player.endY);

        uint256 fromBalance = _balances[id][from];

        require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
    }

    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = _msgSender();

        Player storage player = players[from];
        _move(_msgSender(), player.endX, player.endY);

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];

            require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
            unchecked {
                _balances[id][from] = fromBalance - amount;
            }
            _balances[id][to] += amount;
        }

        emit TransferBatch(operator, from, to, ids, amounts);

        _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, amounts, data);
    }

    function _mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual {
        address operator = _msgSender();

        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);
    }

    function _burn(
        address from,
        uint256 id,
        uint256 amount
    ) internal virtual {
        address operator = _msgSender();

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }

        emit TransferSingle(operator, from, address(0), id, amount);
    }

    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC1155: setting approval status for self");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155Received.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            }
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, amounts, data) returns (
                bytes4 response
            ) {
                if (response != IERC1155Receiver.onERC1155BatchReceived.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non ERC1155Receiver implementer");
            }
        }
    }

    function addItemTypes(ItemType[] memory _itemTypes) external onlyOwner {
        for (uint256 i; i < _itemTypes.length; i++) {
            itemTypes.push(_itemTypes[i]);
            emit AddItemType(itemTypes.length - 1, _itemTypes[i]);
        }
    }

    function addRecipes(Recipe[] memory _recipes) external onlyOwner {
        for (uint256 i; i < _recipes.length; i++) {
            recipes.push(_recipes[i]);
            emit AddRecipe(recipes.length - 1, _recipes[i]);
        }
    }

    function stake(uint256 amount) external onlyOwner {
        _stake(amount);
    }

    function unstake(uint256 amount) external onlyOwner {
        _unstake(amount);

        underlyingToken.transfer(owner(), amount);
    }

    function withdrawRewards() external onlyOwner {
        _withdrawRewards();

        unionToken.transfer(owner(), unionToken.balanceOf(address(this)));
    }

    function updateTrust(address borrower_) external {
        Player storage player = players[borrower_];
        _move(_msgSender(), player.endX, player.endY);

        uint256 totalSkill;
        for (uint256 i = MIN_SKILL; i < MAX_SKILL; i++) {
            totalSkill += skills[borrower_][i];
        }

        _updateTrust(borrower_, totalSkill * TRUST_MODIFIER);
    }

    function move(int256 x, int256 y) external {
        _move(_msgSender(), x, y);
    }

    function _move(
        address account,
        int256 x,
        int256 y
    ) internal {
        Player storage player = players[account];

        int256 vX = player.endX - player.startX;
        int256 vY = player.endY - player.startY;

        uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
        uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;
        if (distanceTravelled < distanceNeeded) {
            player.startX += (vX * int256(distanceTravelled)) / int256(distanceNeeded);
            player.startY += (vY * int256(distanceTravelled)) / int256(distanceNeeded);
        } else {
            player.startX = player.endX;
            player.startY = player.endY;

            uint256 tileItem = getItem(player.endX, player.endY);
            uint256 skillIncrease = (miningBonus(account, tileItem) *
                (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR))) / SKILL_INCREASE_DIVISOR;

            _mint(
                account,
                tileItem,
                (skillIncrease * skills[account][tileItem] + (skillIncrease * skillIncrease) / 2),
                ""
            );

            skills[account][tileItem] += skillIncrease;

            emit IncreaseSkill(account, tileItem, skillIncrease);
        }

        player.endX = x;
        player.endY = y;
        player.startTimestamp = block.timestamp;

        emit Move(_msgSender(), x, y);
    }

    function buy(uint256 id, uint256 amount) external {
        ItemType storage item = itemTypes[id];

        require(item.stake > 0, "Item stake not set");

        Player storage player = players[_msgSender()];
        _move(_msgSender(), player.endX, player.endY);

        IERC20(underlyingToken).transferFrom(_msgSender(), address(this), item.stake * amount);
        _mint(_msgSender(), id, amount, "");
    }

    function sell(uint256 id, uint256 amount) external {
        ItemType storage item = itemTypes[id];

        require(item.stake > 0, "Item stake not set");

        Player storage player = players[_msgSender()];
        _move(_msgSender(), player.endX, player.endY);

        _burn(_msgSender(), id, amount);
        IERC20(underlyingToken).transfer(_msgSender(), item.stake * amount);
    }

    function craft(uint256 recipeId) external {
        Recipe storage recipe = recipes[recipeId];
        Player storage player = players[_msgSender()];

        _move(_msgSender(), player.endX, player.endY);
        for (uint256 i; i < recipe.inputIds.length; i++) {
            _burn(_msgSender(), recipe.inputIds[i], recipe.inputQuantities[i]);
        }

        _mint(_msgSender(), recipe.output, 1, "");
    }

    function miningBonus(address account, uint256 id) private view returns (uint256 bonus) {
        ItemType storage item = itemTypes[id];
        for (uint256 i; i < item.toolIds.length; i++) {
            if (item.toolBonuses[i] > bonus && balanceOf(account, item.toolIds[i]) > 0) {
                bonus = item.toolBonuses[i];
            }
        }
    }

    function sqrt(int256 x) private pure returns (int256 y) {
        int256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function getItem(int256 x, int256 y) private pure returns (uint256) {
        if ((x == 0 && y == 0) || x > 10 || x < -9 || y > 10 || y < -9) {
            return 0;
        }

        uint256 res = uint256(keccak256(abi.encode(x, y))) % 5;
        if (res < 2) {
            return 0;
        } else if (res < 4) {
            return 1;
        }

        return 2;
    }
}
