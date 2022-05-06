// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@unioncredit/v1-sdk/contracts/UnionVoucher.sol";

contract UnionQuest is ERC1155, Ownable, UnionVoucher {
    uint256 constant SPEED_DIVISOR = 10;
    uint256 constant SKILL_INCREASE_DIVISOR = 10;

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

    event Move(address account, int256 startX, int256 startY, int256 endX, int256 endY);
    event SetResource(uint256 resourceId, int256 x, int256 y);
    event SetSkill(address account, uint256 skill, uint256 amount);

    constructor(
        address _marketRegistry,
        address _unionToken,
        address _underlyingToken
    ) ERC1155("") BaseUnionMember(_marketRegistry, _unionToken, _underlyingToken) {}

    /* External */

    function stake(uint256 amount) external onlyOwner {
        _stake(amount);
    }

    function unstake(uint256 amount) external onlyOwner {
        _unstake(amount);
    }

    function updateTrust(address borrower_) external {
        _updateTrust(borrower_, getTotalSkill(borrower_));
    }

    function setResource(
        int256 x,
        int256 y,
        uint256 resourceId
    ) external onlyOwner {
        resource[x][y] = resourceId;

        emit SetResource(resourceId, x, y);
    }

    function move(int256 x, int256 y) external {
        Player storage player = players[msg.sender];

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

            uint256 tileResource = resource[player.endX][player.endY];
            if (tileResource != 0) {
                uint256 skillIncrease = (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) /
                    SKILL_INCREASE_DIVISOR;

                _mint(
                    msg.sender,
                    tileResource,
                    ((2 * skills[msg.sender][tileResource] + skillIncrease + 1) * skillIncrease) / 2,
                    ""
                );

                skills[msg.sender][tileResource] += skillIncrease;

                emit SetSkill(msg.sender, tileResource, skills[msg.sender][tileResource]);
            }
        }

        player.endX = x;
        player.endY = y;
        player.startTimestamp = block.timestamp;

        emit Move(msg.sender, player.startX, player.startY, x, y);
    }

    function getPosition(address account) public view returns (int256, int256) {
        Player storage player = players[account];

        int256 vX = player.endX - player.startX;
        int256 vY = player.endY - player.startY;

        int256 distanceNeeded = sqrt(vX * vX + vY * vY);
        int256 distanceTravelled = int256((block.timestamp - player.startTimestamp) / SPEED_DIVISOR);
        if (distanceTravelled < distanceNeeded) {
            return (
                player.startX + (vX * distanceTravelled) / distanceNeeded,
                player.startY + (vY * distanceTravelled) / distanceNeeded
            );
        }

        return (player.endX, player.endY);
    }

    function getSkill(address account, uint256 resourceId) public view returns (uint256 skill) {
        skill = skills[account][resourceId];

        Player storage player = players[account];

        int256 vX = player.endX - player.startX;
        int256 vY = player.endY - player.startY;

        uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
        uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;
        if (distanceTravelled >= distanceNeeded && resource[player.endX][player.endY] != 0) {
            skill +=
                (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) /
                SKILL_INCREASE_DIVISOR;
        }
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

    function getStreamedBalance(address account, uint256 resourceId) public view returns (uint256 balance) {
        Player storage player = players[account];

        balance = balanceOf(account, resourceId);

        int256 vX = player.endX - player.startX;
        int256 vY = player.endY - player.startY;

        uint256 distanceNeeded = uint256(sqrt(vX * vX + vY * vY));
        uint256 distanceTravelled = (block.timestamp - player.startTimestamp) / SPEED_DIVISOR;
        if (
            distanceTravelled >= distanceNeeded &&
            resource[player.endX][player.endY] != 0 &&
            resource[player.endX][player.endY] == resourceId
        ) {
            uint256 skillIncrease = (block.timestamp - (player.startTimestamp + distanceNeeded * SPEED_DIVISOR)) /
                SKILL_INCREASE_DIVISOR;

            balance += ((2 * skills[msg.sender][resourceId] + skillIncrease + 1) * skillIncrease) / 2;
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