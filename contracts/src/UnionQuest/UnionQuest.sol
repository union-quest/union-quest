// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@unioncredit/v1-sdk/contracts/UnionVoucher.sol";

contract UnionQuest is Context, ERC165, IERC1155, Ownable, UnionVoucher {
    using Address for address;

    uint256 constant SPEED_DIVISOR = 10;
    uint256 constant SKILL_INCREASE_DIVISOR = 10;
    uint256 constant TRUST_MODIFIER = 10000000000000000;

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

    mapping(address => Player) private players;
    mapping(address => mapping(uint256 => uint256)) private skills;
    mapping(int256 => mapping(int256 => uint256)) private resource;

    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint256)) private _balances;

    // Mapping from account to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Move(address account, int256 startX, int256 startY, int256 endX, int256 endY);
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

                balance += skillIncrease * skills[msg.sender][tileItem] + (skillIncrease * skillIncrease) / 2;
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
        _move(player.endX, player.endY, from);

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
        _move(player.endX, player.endY, from);

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
        require(to != address(0), "ERC1155: mint to the zero address");

        address operator = _msgSender();

        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);

        _doSafeTransferAcceptanceCheck(operator, address(0), to, id, amount, data);
    }

    function _mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");

        address operator = _msgSender();

        for (uint256 i = 0; i < ids.length; i++) {
            _balances[ids[i]][to] += amounts[i];
        }

        emit TransferBatch(operator, address(0), to, ids, amounts);

        _doSafeBatchTransferAcceptanceCheck(operator, address(0), to, ids, amounts, data);
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
        _updateTrust(borrower_, getTotalSkill(borrower_) * TRUST_MODIFIER);
    }

    function move(int256 x, int256 y) external {
        _move(x, y, msg.sender);
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

        emit Move(msg.sender, player.startX, player.startY, x, y);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public {
        _mintBatch(to, ids, amounts, data);
    }

    function getTotalSkill(address account) public view returns (uint256 total) {
        Player storage player = players[account];
        for (uint256 i = 1; i < 3; i++) {
            total += skills[account][i];
            if (i == resource[player.endX][player.endY]) {
                int256 vX = player.endX - player.startX;
                int256 vY = player.endY - player.startY;

                uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
                uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;
                if (distanceTravelled >= distanceNeeded) {
                    total +=
                        (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) /
                        SKILL_INCREASE_DIVISOR;
                }
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
}
