// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@unioncredit/v1-sdk/contracts/UnionVoucher.sol";

contract UnionQuest is Context, ERC165, IERC1155, Ownable, UnionVoucher {
    using Address for address;

    uint256 constant SPEED_DIVISOR = 10;
    uint256 constant SKILL_INCREASE_DIVISOR = 10;
    uint256 constant TRUST_MODIFIER = 0.01 ether;
    uint256 constant ITEM_PRICE = 5 ether;
    uint256 constant MIN_SKILL = 1;
    uint256 constant MAX_SKILL = 3;
    uint256 constant CRAFT_AMOUNT = 100;

    struct ItemType {
        string name;
        string symbol;
    }

    struct Recipe {
        uint256[] inputs;
        uint256 output;
    }

    struct Tile {
        int256 x;
        int256 y;
        uint256 resourceId;
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

    mapping(int256 => mapping(int256 => uint256)) private resource;
    mapping(address => Player) private players;
    mapping(address => mapping(uint256 => uint256)) private skills;
    mapping(uint256 => mapping(address => uint256)) private _balances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event AddItemType(uint256 _index, ItemType _itemType);
    event AddRecipe(uint256 _index, Recipe _recipe);
    event Move(address account, int256 x, int256 y);
    event SetResource(uint256 resourceId, int256 x, int256 y);
    event SetSkill(address account, uint256 skill, uint256 amount);

    constructor(
        address _marketRegistry,
        address _unionToken,
        address _underlyingToken
    ) BaseUnionMember(_marketRegistry, _unionToken, _underlyingToken) {}

    function balanceOf(address account, uint256 id) public view virtual override returns (uint256 balance) {
        require(account != address(0), "ERC1155: address zero is not a valid owner");

        balance = _balances[id][account];

        Player storage player = players[account];

        uint256 tileItem = resource[player.endX][player.endY];
        if (tileItem != 0 && tileItem == id) {
            int256 vX = player.endX - player.startX;
            int256 vY = player.endY - player.startY;

            uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
            uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;

            if (distanceTravelled >= distanceNeeded) {
                uint256 skillIncrease = (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) /
                    SKILL_INCREASE_DIVISOR;

                balance += skillIncrease * skills[_msgSender()][tileItem] + (skillIncrease * skillIncrease) / 2;
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

        _settle(from, id);

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

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            _settle(from, id);

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
        require(to != address(0), "ERC1155: mint to the zero address");

        address operator = _msgSender();

        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);

        _doSafeTransferAcceptanceCheck(operator, address(0), to, id, amount, data);
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
    }

    function setResources(Tile[] calldata tiles) external onlyOwner {
        for (uint256 i; i < tiles.length; i++) {
            Tile calldata tile = tiles[i];

            resource[tile.x][tile.y] = tile.resourceId;

            emit SetResource(tile.resourceId, tile.x, tile.y);
        }
    }

    function updateTrust(address borrower_) external {
        uint256 totalSkill;
        for (uint256 i = MIN_SKILL; i < MAX_SKILL; i++) {
            totalSkill += skills[borrower_][i];
        }

        Player storage player = players[borrower_];
        uint256 tileItem = resource[player.endX][player.endY];
        if (tileItem != 0) {
            int256 vX = player.endX - player.startX;
            int256 vY = player.endY - player.startY;

            uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
            uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;
            if (distanceTravelled >= distanceNeeded) {
                totalSkill +=
                    (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) /
                    SKILL_INCREASE_DIVISOR;
            }
        }

        _updateTrust(borrower_, totalSkill * TRUST_MODIFIER);
    }

    function move(int256 x, int256 y) external {
        _move(x, y, _msgSender());
    }

    function _move(
        int256 x,
        int256 y,
        address account
    ) internal {
        Player storage player = players[account];

        int256 vX = player.endX - player.startX;
        int256 vY = player.endY - player.startY;

        uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
        uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;
        if (distanceTravelled < distanceNeeded) {
            player.startX = player.startX + (vX * int256(distanceTravelled)) / int256(distanceNeeded);
            player.startY = player.startY + (vY * int256(distanceTravelled)) / int256(distanceNeeded);
        } else {
            player.startX = player.endX;
            player.startY = player.endY;

            uint256 tileItem = resource[player.endX][player.endY];
            if (tileItem != 0) {
                uint256 skillIncrease = (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) /
                    SKILL_INCREASE_DIVISOR;

                _mint(
                    account,
                    tileItem,
                    skillIncrease * skills[account][tileItem] + (skillIncrease * skillIncrease) / 2,
                    ""
                );

                skills[account][tileItem] += skillIncrease;

                emit SetSkill(account, tileItem, skills[account][tileItem]);
            }
        }

        player.endX = x;
        player.endY = y;
        player.startTimestamp = block.timestamp;

        emit Move(_msgSender(), x, y);
    }

    function _settle(address account, uint256 id) internal {
        if (id != 0) {
            Player storage player = players[account];
            uint256 tileItem = resource[player.endX][player.endY];

            if (tileItem == id) {
                int256 vX = player.endX - player.startX;
                int256 vY = player.endY - player.startY;

                uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
                uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;
                if (distanceTravelled < distanceNeeded) {
                    player.startX = player.startX + (vX * int256(distanceTravelled)) / int256(distanceNeeded);
                    player.startY = player.startY + (vY * int256(distanceTravelled)) / int256(distanceNeeded);
                } else {
                    player.startX = player.endX;
                    player.startY = player.endY;

                    uint256 skillIncrease = (block.timestamp -
                        (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) / SKILL_INCREASE_DIVISOR;

                    _mint(
                        account,
                        tileItem,
                        skillIncrease * skills[account][tileItem] + (skillIncrease * skillIncrease) / 2,
                        ""
                    );

                    skills[account][tileItem] += skillIncrease;

                    emit SetSkill(account, tileItem, skills[account][tileItem]);
                }

                player.startTimestamp = block.timestamp;

                emit Move(_msgSender(), player.endX, player.endY);
            }
        }
    }

    function buy(uint256 id, uint256 amount) external {
        require(id == 3 || id == 4, "Item is not valid");

        IERC20(underlyingToken).transferFrom(_msgSender(), address(this), amount * ITEM_PRICE);
        _mint(_msgSender(), id, amount, "");
    }

    function sell(uint256 id, uint256 amount) external {
        require(id == 3 || id == 4, "Item is not valid");

        _burn(_msgSender(), id, amount);
        IERC20(underlyingToken).transfer(_msgSender(), amount * ITEM_PRICE);
    }

    function craft(uint256 recipeId) external {
        Recipe storage recipe = recipes[recipeId];

        for (uint256 i; i < recipe.inputs.length; i++) {
            _settle(_msgSender(), recipe.inputs[i]);
            _burn(_msgSender(), recipe.inputs[i], CRAFT_AMOUNT);
        }

        _mint(_msgSender(), recipe.output, 1, "");
    }

    function sqrt(int256 x) private pure returns (int256 y) {
        int256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
