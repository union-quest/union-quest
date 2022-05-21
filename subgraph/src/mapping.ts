/* eslint-disable prefer-const */
import { AddItemType, AddRecipe, Move, IncreaseSkill, TransferSingle } from '../generated/UnionQuest/UnionQuest';
import { LogUpdateTrust } from '../generated/UserManager/UserManagerContract';
import { Balance, Player, Item, Recipe, Input, Tool, Tile } from '../generated/schema';
import { BigInt, Bytes, crypto, ethereum, log } from '@graphprotocol/graph-ts';

let ZERO_ADDRESS_STRING = '0x0000000000000000000000000000000000000000';
let ZERO_ADDRESS: Bytes = Bytes.fromHexString(ZERO_ADDRESS_STRING) as Bytes;

let UNION_QUEST_ADDRESS_STRING = '0xFa4330DC07143e2c163cABc6780C167B9969D5F9';
let UNION_QUEST_ADDRESS: Bytes = Bytes.fromHexString(UNION_QUEST_ADDRESS_STRING) as Bytes;

function distance(x0: BigInt, y0: BigInt, x1: BigInt, y1: BigInt): BigInt {
  const xDiff = x1.minus(x0);
  const yDiff = y1.minus(y0);
  return xDiff.times(xDiff).plus(yDiff.times(yDiff)).sqrt();
}

export function getOrCreatePlayer(
  id: string
): Player {
  let entity = Player.load(id);
  if (!entity) {
    entity = new Player(id);
    getOrCreateBalance("1", id).save()
    getOrCreateBalance("2", id).save()
    const tile = getOrCreateTile(BigInt.fromString("0"), BigInt.fromString("0"));
    tile.save();
    entity.startTile = tile.id;
    entity.endTile = tile.id;
    entity.startTimestamp = BigInt.fromString("0");
  }

  return entity;
}

export function getOrCreateItem(
  id: string
): Item {
  let entity = Item.load(id);
  if (!entity) {
    entity = new Item(id);
    entity.name = "";
    entity.description = "";
    entity.image = "";
    entity.stake = BigInt.fromString("0");
  }

  return entity;
}

const getItem = (x: BigInt, y: BigInt): string => {
  if ((x.equals(BigInt.fromString("0")) && y.equals(BigInt.fromString("0"))) ||
    x.gt(BigInt.fromString("10")) || x.lt(BigInt.fromString("-9")) || x.gt(BigInt.fromString("10")) || y.lt(BigInt.fromString("-9"))) {
    return "0";
  }

  let tupleArray: Array<ethereum.Value> = [
    ethereum.Value.fromSignedBigInt(x),
    ethereum.Value.fromSignedBigInt(y),
  ]

  let tuple = changetype<ethereum.Tuple>(tupleArray);

  let encoded = ethereum.encode(ethereum.Value.fromTuple(tuple))
  if (encoded) {
    const res = BigInt.fromUnsignedBytes(crypto.keccak256(encoded)).mod(BigInt.fromString("5"));
    log.warning("NUMBAR: {}", [res.toString()]);
    if (res.lt(BigInt.fromString("2"))) {
      return "0";
    } else if (res.lt(BigInt.fromString("4"))) {
      return "1";
    }
  }

  return "2";
}

export function getOrCreateTile(
  x: BigInt, y: BigInt
): Tile {
  let entity = Tile.load(x.toString() + "_" + y.toString());
  if (!entity) {
    entity = new Tile(x.toString() + "_" + y.toString());
    entity.x = x;
    entity.y = y;
    entity.item = getItem(x, y);
  }

  return entity;
}

export function getOrCreateTool(
  itemId: string, toolId: string
): Tool {
  let entity = Tool.load(itemId + "_" + toolId);
  if (!entity) {
    entity = new Tool(itemId + "_" + toolId);
  }

  return entity;
}

export function getOrCreateInput(
  recipeId: string, itemId: string
): Input {
  let entity = Input.load(recipeId + "_" + itemId);
  if (!entity) {
    entity = new Input(recipeId + "_" + itemId);
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
    entity.item = itemId;
    entity.player = playerId;
    entity.value = BigInt.fromString("0");
    entity.skill = BigInt.fromString("0");
  }

  return entity;
}

export function handleAddItemType(event: AddItemType): void {
  let entity = getOrCreateItem(event.params._index.toString());

  entity.name = event.params._itemType.name;
  entity.description = event.params._itemType.description;
  entity.image = event.params._itemType.image;
  entity.stake = event.params._itemType.stake;

  for (let i = 0; i < event.params._itemType.toolIds.length; i++) {
    let tool = getOrCreateTool(event.params._index.toString(), event.params._itemType.toolIds[i].toString());
    tool.item = event.params._index.toString();
    tool.tool = event.params._itemType.toolIds[i].toString();
    tool.save();
  }

  entity.save();
}

export function handleAddRecipe(event: AddRecipe): void {
  let entity = getOrCreateRecipe(event.params._index.toString());

  for (let i = 0; i < event.params._recipe.inputIds.length; i++) {
    let input = getOrCreateInput(event.params._index.toString(), event.params._recipe.inputIds[i].toString());
    input.item = event.params._recipe.inputIds[i].toString();
    input.recipe = event.params._index.toString();
    input.quantity = event.params._recipe.inputQuantities[i];
    input.save()
  }

  entity.output = event.params._recipe.output.toString();

  entity.save();
}

export function handleMove(event: Move): void {
  let entity = getOrCreatePlayer(event.params.account.toHexString());
  const startTile = getOrCreateTile(BigInt.fromString(entity.startTile.split("_")[0]), BigInt.fromString(entity.startTile.split("_")[1]));
  const endTile = getOrCreateTile(BigInt.fromString(entity.endTile.split("_")[0]), BigInt.fromString(entity.endTile.split("_")[1]));

  const distanceTravelled = (event.block.timestamp.minus(entity.startTimestamp)).div(BigInt.fromString("10"));
  const distanceNeeded = distance(
    startTile.x,
    startTile.y,
    endTile.x,
    endTile.y
  );

  if (distanceTravelled.lt(distanceNeeded)) {
    const vX = endTile.x.minus(startTile.x);
    const vY = endTile.y.minus(startTile.y);

    const newStartTile = getOrCreateTile(startTile.x.plus((vX.times(distanceTravelled)).div(distanceNeeded)), startTile.y.plus((vY.times(distanceTravelled)).div(distanceNeeded)));
    newStartTile.save();
    entity.startTile = newStartTile.id;
  } else {
    const newStartTile = getOrCreateTile(endTile.x, endTile.y);
    newStartTile.save();
    entity.startTile = newStartTile.id;
  }

  const newEndTile = getOrCreateTile(event.params.x, event.params.y);
  newEndTile.save();
  entity.endTile = newEndTile.id;
  entity.startTimestamp = event.block.timestamp;

  entity.save();
}

export function handleIncreaseSkill(event: IncreaseSkill): void {
  let balance = getOrCreateBalance(event.params.id.toString(), event.params.account.toHexString());

  balance.skill = balance.skill.plus(event.params.value);

  balance.save();
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
  if (event.params.staker == UNION_QUEST_ADDRESS) {
    let borrower = getOrCreatePlayer(event.params.borrower.toHexString());

    borrower.vouch = event.params.trustAmount;

    borrower.save();
  }
}
