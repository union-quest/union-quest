/* eslint-disable prefer-const */
import { AddItemType, AddRecipe, Move, SetResource, SetSkill, TransferSingle } from '../generated/UnionQuest/UnionQuest';
import { LogUpdateTrust } from '../generated/UserManager/UserManagerContract';
import { Balance, Player, Item, Recipe, Tile } from '../generated/schema';
import { BigInt, Bytes, } from '@graphprotocol/graph-ts';

let ZERO_ADDRESS_STRING = '0x0000000000000000000000000000000000000000';
let ZERO_ADDRESS: Bytes = Bytes.fromHexString(ZERO_ADDRESS_STRING) as Bytes;

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
  }

  return entity;
}

export function getOrCreateRecipe(
  id: string
): Recipe {
  let entity = Recipe.load(id);
  if (!entity) {
    entity = new Recipe(id);
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

export function handleAddItemType(event: AddItemType): void {
  let entity = getOrCreateItem(event.params._index.toString());

  entity.name = event.params._itemType.name;
  entity.symbol = event.params._itemType.symbol;

  entity.save();
}

export function handleAddRecipe(event: AddRecipe): void {
  let entity = getOrCreateRecipe(event.params._index.toString());

  entity.inputs = [event.params._recipe.inputs[0].toString(), event.params._recipe.inputs[1].toString()]
  entity.output = event.params._recipe.output.toString();

  entity.save();
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

export function handleMove(event: Move): void {
  let entity = getOrCreatePlayer(event.params.account.toHexString());
  let endTile = getOrCreateTile(event.params.x, event.params.y);

  entity.startTile = entity.endTile;
  entity.endTile = event.params.x.toString() + "_" + event.params.y.toString();
  entity.startTimestamp = event.block.timestamp;

  entity.save();
  endTile.save();
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
  let item = getOrCreateItem(event.params.id.toString());

  if (event.params.from != ZERO_ADDRESS) {
    let fromBalance = getOrCreateBalance(event.params.id.toString(), event.params.from.toHexString());

    fromBalance.item = event.params.id.toString();
    fromBalance.player = event.params.from.toHexString();
    fromBalance.value = fromBalance.value.minus(event.params.value);

    fromBalance.save();
  }

  if (event.params.to != ZERO_ADDRESS) {
    let toBalance = getOrCreateBalance(event.params.id.toString(), event.params.to.toHexString());

    toBalance.item = event.params.id.toString();
    toBalance.player = event.params.to.toHexString();
    toBalance.value = toBalance.value.plus(event.params.value);

    toBalance.save();
  }

  item.save();
}

export function handleUpdateTrust(event: LogUpdateTrust): void {
  let borrower = getOrCreatePlayer(event.params.borrower.toHexString());

  borrower.vouch = event.params.trustAmount;

  borrower.save();
}
