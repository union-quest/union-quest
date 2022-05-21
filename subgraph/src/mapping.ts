/* eslint-disable prefer-const */
import { AddItemType, AddRecipe, Move, IncreaseSkill, TransferSingle } from '../generated/UnionQuest/UnionQuest';
import { LogUpdateTrust } from '../generated/UserManager/UserManagerContract';
import { Balance, Player, Item, Recipe, Input, Tool } from '../generated/schema';
import { BigInt, Bytes } from '@graphprotocol/graph-ts';

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
    entity.startX = BigInt.fromString("0");
    entity.startY = BigInt.fromString("0");
    entity.endX = BigInt.fromString("0");
    entity.endY = BigInt.fromString("0");
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

  const distanceTravelled = (event.block.timestamp.minus(entity.startTimestamp)).div(BigInt.fromString("10"));
  const distanceNeeded = distance(
    entity.startX,
    entity.startY,
    entity.endX,
    entity.endY
  );

  if (distanceTravelled.lt(distanceNeeded)) {
    const vX = entity.endX.minus(entity.startX);
    const vY = entity.endY.minus(entity.startY);

    entity.startX = entity.startX.plus((vX.times(distanceTravelled)).div(distanceNeeded));
    entity.startY = entity.startY.plus((vY.times(distanceTravelled)).div(distanceNeeded));
  } else {
    entity.startX = entity.endX;
    entity.startY = entity.endY;
  }

  entity.endX = event.params.x;
  entity.endY = event.params.y;
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
