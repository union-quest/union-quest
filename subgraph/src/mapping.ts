/* eslint-disable prefer-const */
import { Move } from '../generated/UnionQuestCore/UnionQuestCoreContract';
import { Player } from '../generated/schema';

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

export function handleMove(event: Move): void {
  let entity = getOrCreatePlayer(event.params._player.toHexString());

  entity.x = event.params._x.toI32();
  entity.y = event.params._y.toI32();

  entity.save();
}
