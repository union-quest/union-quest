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
    entity.startX = BigInt.fromString("0");
    entity.startY = BigInt.fromString("0");
    entity.endX = BigInt.fromString("0");
    entity.endY = BigInt.fromString("0");
    entity.startTimestamp = BigInt.fromString("0");
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

  entity.startX = event.params.startX;
  entity.startY = event.params.startY;
  entity.endX = event.params.endX;
  entity.endY = event.params.endY;
  entity.startTimestamp = event.block.timestamp;

  entity.save();
}

export function handleSetResource(event: SetResource): void {
  let entity = getOrCreateTile(event.params.x.toString() + "_" + event.params.y.toString());

  entity.x = event.params.x;
  entity.y = event.params.y;
  entity.resourceId = event.params.resourceId;

  entity.save();
}

export function handleSetSkill(event: SetSkill): void {

}

export function handleUpdateTrust(event: LogUpdateTrust): void {
  let trust = getOrCreateTrust(event.params.staker.toHexString() + "_" + event.params.borrower.toHexString());

  trust.staker = event.params.staker;
  trust.borrower = event.params.borrower;
  trust.trustAmount = event.params.trustAmount;

  trust.save();
}
