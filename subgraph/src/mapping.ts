/* eslint-disable prefer-const */
import { AddVillage, Move } from '../generated/UnionQuestCore/UnionQuestCoreContract';
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

export function handleMove(event: Move): void {
  let entity = getOrCreatePlayer(event.params._player.toHexString());

  entity.x = event.params._x.toI32();
  entity.y = event.params._y.toI32();

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
