/* eslint-disable prefer-const */
import { AddItemType, AddVillage, BeginMove, ResolveMove, BeginWork, ResolveWork } from '../generated/UnionQuestCore/UnionQuestCoreContract';
import { LogUpdateTrust } from '../generated/UserManager/UserManagerContract';
import { Player, Village, ItemType, Trust } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function getOrCreatePlayer(
  id: string
): Player {
  let entity = Player.load(id);
  if (!entity) {
    entity = new Player(id);
    entity.x = 0;
    entity.y = 0;
  }

  return entity;
}

export function getOrCreateItemType(
  id: string
): ItemType {
  let itemType = ItemType.load(id);
  if (!itemType) {
    itemType = new ItemType(id);
  }

  return itemType;
}

export function getOrCreateVillage(
  id: string
): Village {
  let entity = Village.load(id);
  if (!entity) {
    entity = new Village(id);
    entity.x = 0;
    entity.y = 0;
    entity.name = "";
    entity.description = "";
  }

  return entity;
}

export function getOrCreateTrust(
  id: string
): Trust {
  let entity = Trust.load(id);
  if (!entity) {
    entity = new Trust(id);
  }

  return entity;
}

export function handleStart(event: BeginMove): void {
  let entity = getOrCreatePlayer(event.params._address.toHexString());

  entity.save();
}

export function handleBeginMove(event: BeginMove): void {
  let entity = getOrCreatePlayer(event.params._address.toHexString());

  entity.xDestination = event.params._player.x.toI32();
  entity.yDestination = event.params._player.y.toI32();
  entity.arrivalTime = event.params._player.arrivalTime.toI32();

  entity.save();
}

export function handleResolveMove(event: ResolveMove): void {
  let entity = getOrCreatePlayer(event.params._address.toHexString());

  entity.x = event.params._player.x.toI32();
  entity.y = event.params._player.y.toI32();
  entity.arrivalTime = null;

  entity.save();
}

export function handleBeginWork(event: BeginWork): void {
  let entity = getOrCreatePlayer(event.params._address.toHexString());

  entity.workTime = event.params._player.workTime.toI32();

  entity.save();
}

export function handleResolveWork(event: ResolveWork): void {
  let entity = getOrCreatePlayer(event.params._address.toHexString());

  entity.workTime = null;

  entity.save();
}

export function handleAddItemType(event: AddItemType): void {
  let entity = getOrCreateItemType(event.params._index.toString());

  entity.name = event.params._itemType.name;
  entity.description = event.params._itemType.description;
  entity.buyPrice = BigInt.fromString(event.params._itemType.buyPrice.toString());
  entity.sellPrice = BigInt.fromString(event.params._itemType.sellPrice.toString());

  entity.save();
}

export function handleAddVillage(event: AddVillage): void {
  let entity = getOrCreateVillage(event.params._x.toString() + "_" + event.params._y.toString());

  entity.x = event.params._x.toI32();
  entity.y = event.params._y.toI32();
  entity.name = event.params._village.name;
  entity.description = event.params._village.description;
  entity.member = event.params._village.member.toHexString();

  entity.save();
}

export function handleUpdateTrust(event: LogUpdateTrust): void {
  let trust = getOrCreateTrust(event.params.staker.toHexString() + "_" + event.params.borrower.toHexString());

  trust.staker = event.params.staker.toHexString();
  trust.borrower = event.params.borrower.toHexString();
  trust.trustAmount = event.params.trustAmount;

  trust.save();
}
