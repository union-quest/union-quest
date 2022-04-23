/* eslint-disable prefer-const */
import { AddVillage, BeginMove, ResolveMove } from '../generated/UnionQuestCore/UnionQuestCoreContract';
import { Player, Village } from '../generated/schema';

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

export function handleStart(event: BeginMove): void {
  let entity = getOrCreatePlayer(event.params._address.toHexString());

  entity.save();
}

export function handleBeginMove(event: BeginMove): void {
  let entity = getOrCreatePlayer(event.params._address.toHexString());

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

export function handleAddVillage(event: AddVillage): void {
  let entity = getOrCreateVillage(event.params._x.toString() + "_" + event.params._y.toString());

  entity.x = event.params._x.toI32();
  entity.y = event.params._y.toI32();
  entity.name = event.params._village.name;
  entity.description = event.params._village.description;

  entity.save();
}
