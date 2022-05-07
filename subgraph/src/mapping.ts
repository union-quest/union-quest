/* eslint-disable prefer-const */
import { Move, SetResource, SetSkill } from '../generated/UnionQuest/UnionQuest';
import { LogUpdateTrust } from '../generated/UserManager/UserManagerContract';
import { Player, Tile, Trust } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function getOrCreatePlayer(
  id: string
): Player {
  let entity = Player.load(id);
  if (!entity) {
    entity = new Player(id);
    let tile = getOrCreateTile("0_0");
    tile.save();
    entity.startTile = "0_0";
    entity.endTile = "0_0";
    entity.startTimestamp = BigInt.fromString("0");
    entity.woodSkill = BigInt.fromString("0");
    entity.stoneSkill = BigInt.fromString("0");
  }

  return entity;
}

export function getOrCreateTile(
  id: string
): Tile {
  let entity = Tile.load(id);
  if (!entity) {
    entity = new Tile(id);
    entity.x = BigInt.fromString("0");
    entity.y = BigInt.fromString("0");
    entity.resourceId = BigInt.fromString("0");
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

export function handleMove(event: Move): void {
  let entity = getOrCreatePlayer(event.params.account.toHexString());
  let startTile = getOrCreateTile(event.params.startX.toString() + "_" + event.params.startY.toString());
  let endTile = getOrCreateTile(event.params.endX.toString() + "_" + event.params.endY.toString());

  entity.startTile = event.params.startX.toString() + "_" + event.params.startY.toString();
  entity.endTile = event.params.endX.toString() + "_" + event.params.endY.toString();
  entity.startTimestamp = event.block.timestamp;

  entity.save();
  startTile.save();
  endTile.save();
}

export function handleSetResource(event: SetResource): void {
  let entity = getOrCreateTile(event.params.x.toString() + "_" + event.params.y.toString());

  entity.x = event.params.x;
  entity.y = event.params.y;
  entity.resourceId = event.params.resourceId;

  entity.save();
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

export function handleUpdateTrust(event: LogUpdateTrust): void {
  let trust = getOrCreateTrust(event.params.staker.toHexString() + "_" + event.params.borrower.toHexString());
  let staker = getOrCreatePlayer(event.params.staker.toHexString());
  let borrower = getOrCreatePlayer(event.params.borrower.toHexString());

  trust.staker = event.params.staker.toHexString();
  trust.borrower = event.params.borrower.toHexString();
  trust.trustAmount = event.params.trustAmount;

  trust.save();
  staker.save();
  borrower.save();
}
