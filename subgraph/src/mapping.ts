/* eslint-disable prefer-const */
import { Move, SetResource, SetSkill, TransferSingle } from '../generated/UnionQuest/UnionQuest';
import { LogUpdateTrust } from '../generated/UserManager/UserManagerContract';
import { Balance, Player, Item, Tile } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function getOrCreatePlayer(
  id: string
): Player {
  let entity = Player.load(id);
  if (!entity) {
    entity = new Player(id);
    let tile = getOrCreateTile(BigInt.fromString("0"), BigInt.fromString("0"));
    tile.save();
    getOrCreateBalance("1", id).save();
    getOrCreateBalance("2", id).save();
    entity.startTile = "0_0";
    entity.endTile = "0_0";
    entity.startTimestamp = BigInt.fromString("0");
    entity.woodSkill = BigInt.fromString("0");
    entity.stoneSkill = BigInt.fromString("0");
  }

  return entity;
}

export function getOrCreateTile(
  x: BigInt, y: BigInt
): Tile {
  let entity = Tile.load(x.toString() + "_" + y.toString());
  if (!entity) {
    entity = new Tile(x.toString() + "_" + y.toString());
    entity.x = x;
    entity.y = y;
  }

  return entity;
}


export function getOrCreateItem(
  id: string
): Item {
  let entity = Item.load(id);
  if (!entity) {
    entity = new Item(id);
    if (id == "1") {
      entity.name = "Wood";
      entity.symbol = "🪵";
    } else {
      entity.name = "Stone";
      entity.symbol = "🪨";
    }
  }

  return entity;
}

export function getOrCreateBalance(
  itemId: string, playerId: string
): Balance {
  let entity = Balance.load(itemId + "_" + playerId);
  if (!entity) {
    entity = new Balance(itemId + "_" + playerId);
    entity.value = BigInt.fromString("0");
    entity.item = itemId;
    entity.player = playerId;
  }

  return entity;
}

export function handleMove(event: Move): void {
  let entity = getOrCreatePlayer(event.params.account.toHexString());
  let startTile = getOrCreateTile(event.params.startX, event.params.startY);
  let endTile = getOrCreateTile(event.params.endX, event.params.endY);

  entity.startTile = event.params.startX.toString() + "_" + event.params.startY.toString();
  entity.endTile = event.params.endX.toString() + "_" + event.params.endY.toString();
  entity.startTimestamp = event.block.timestamp;

  entity.save();
  startTile.save();
  endTile.save();
}

export function handleSetResource(event: SetResource): void {
  let entity = getOrCreateTile(event.params.x, event.params.y);
  let item = getOrCreateItem(event.params.resourceId.toString());

  entity.x = event.params.x;
  entity.y = event.params.y;
  entity.item = event.params.resourceId.toString();

  entity.save();
  item.save();
}

export function handleSetSkill(event: SetSkill): void {
  let entity = getOrCreatePlayer(event.params.account.toHexString());

  if (event.params.skill.equals(BigInt.fromString("1"))) {
    entity.woodSkill = event.params.amount;
  } else {
    entity.stoneSkill = event.params.amount;
  }

  entity.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let entity = getOrCreateBalance(event.params.id.toString(), event.params.to.toHexString())
  let item = getOrCreateItem(event.params.id.toString());

  entity.item = event.params.id.toString();
  entity.player = event.params.to.toHexString();
  entity.value = entity.value.plus(event.params.value);

  entity.save();
  item.save();
}

export function handleUpdateTrust(event: LogUpdateTrust): void {
  let borrower = getOrCreatePlayer(event.params.borrower.toHexString());

  // check staker event.params.staker.toHexString() === UnionQuest contract;
  borrower.vouch = event.params.trustAmount;

  borrower.save();
}

// TODO: check trust
// refactor inventory UI
// Add shops
