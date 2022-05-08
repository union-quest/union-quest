import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';
import type { TransactionStore } from 'web3w';
import type { Invalidator, Subscriber, Unsubscriber } from 'web3w/dist/esm/utils/internals';
import { SUBGRAPH_ENDPOINT } from '$lib/blockchain/subgraph';
import { transactions } from '$lib/blockchain/wallet';
import type { QueryState, QueryStore } from '$lib/utils/stores/graphql';
import { HookedQueryStore } from '$lib/utils/stores/graphql';
import type { EndPoint } from '$lib/utils/graphql/endpoint';
import { chainTempo } from '$lib/blockchain/chainTempo';
import type { Tile } from '$lib/tile/tiles';

export type Player = {
  id: string;
  startTile: Tile;
  endTile: Tile;
  startTimestamp: string;
  woodSkill: string;
  stoneSkill: string;
  vouch: string;
  balances: { id: string; player: string, item: string, value: string }[];
}

// TODO web3w needs to export the type
type TransactionStatus = 'pending' | 'cancelled' | 'success' | 'failure' | 'mined';
type TransactionRecord = {
  hash: string;
  from: string;
  submissionBlockTime: number;
  acknowledged: boolean;
  status: TransactionStatus;
  nonce: number;
  confirmations: number;
  finalized: boolean;
  lastAcknowledgment?: TransactionStatus;
  to?: string;
  gasLimit?: string;
  gasPrice?: string;
  data?: string;
  value?: string;
  contractName?: string;
  method?: string;
  args?: unknown[];
  eventsABI?: unknown; // TODO
  metadata?: unknown;
  lastCheck?: number;
  blockHash?: string;
  blockNumber?: number;
  events?: unknown[]; // TODO
};

class UserStore implements QueryStore<Player> {
  private queryStore: QueryStore<Player>;
  private store: Readable<QueryState<Player>>;
  constructor(endpoint: EndPoint, private transactions: TransactionStore, id: string) {
    this.queryStore = new HookedQueryStore(
      endpoint,
      `
    query getPlayer($id: ID!){
      player(id: $id) {
        id
      }
    }`,
      chainTempo,
      { path: 'player', variables: { id: id.toLowerCase() } }
    );
    this.store = derived([this.queryStore, this.transactions], (values) => this.update(values));
  }
  private update([$query]: [QueryState<Player>, TransactionRecord[]]): QueryState<Player> {
    if (!$query.data) {
      return $query;
    } else {
      let newData = $query.data;
      return {
        step: $query.step,
        error: $query.error,
        data: newData,
      };
    }
  }

  acknowledgeError() {
    return this.queryStore.acknowledgeError();
  }

  subscribe(
    run: Subscriber<QueryState<Player>>,
    invalidate?: Invalidator<QueryState<Player>> | undefined
  ): Unsubscriber {
    return this.store.subscribe(run, invalidate);
  }
}

export const getPlayer = (id: string) => new UserStore(SUBGRAPH_ENDPOINT, transactions, id);

/* Helpers */

const SPEED_DIVISOR = 10;
const SKILL_INCREASE_DIVISOR = 10;

export const distance = (x0: number, y0: number, x1: number, y1: number) => {
  const xDiff = x1 - x0;
  const yDiff = y1 - y0;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

export const getPosition = (player: Player, currentTimestamp: number): [number, number] => {
  const distanceTravelled = (currentTimestamp - parseInt(player.startTimestamp)) / 10;
  const distanceNeeded = distance(
    parseInt(player.startTile.x),
    parseInt(player.startTile.y),
    parseInt(player.endTile.x),
    parseInt(player.endTile.y)
  );

  if (distanceTravelled < distanceNeeded) {
    const vX = parseInt(player.endTile.x) - parseInt(player.startTile.x);
    const vY = parseInt(player.endTile.y) - parseInt(player.startTile.y);

    return [
      parseInt(player.startTile.x) + (vX * distanceTravelled) / distanceNeeded,
      parseInt(player.startTile.y) + (vY * distanceTravelled) / distanceNeeded,
    ];
  }

  return [parseInt(player.endTile.x), parseInt(player.endTile.y)];
}

export const getSkill = (player: Player, currentTimestamp: number, resourceId: number): number => {
  const distanceTravelled = (currentTimestamp - parseInt(player.startTimestamp)) / SPEED_DIVISOR;
  const distanceNeeded = distance(
    parseInt(player.startTile.x),
    parseInt(player.startTile.y),
    parseInt(player.endTile.x),
    parseInt(player.endTile.y)
  );

  const savedSkill = parseInt(resourceId === 1 ? player.woodSkill : player.stoneSkill);

  if (distanceTravelled >= distanceNeeded && resourceId.toString() === player.endTile.resourceId) {
    return savedSkill +
      (currentTimestamp - (parseInt(player.startTimestamp) + distanceNeeded * SPEED_DIVISOR)) /
      SKILL_INCREASE_DIVISOR;
  }

  return savedSkill;
}

export const getBalanceStreamed = (player: Player, currentTimestamp: number, resourceId: number): number => {
  const balanceObject = player.balances.find(b => b.id === resourceId.toString());
  const savedBalance = balanceObject ? parseInt(balanceObject.value) : 0;
  const savedSkill = resourceId === 1 ? parseInt(player.woodSkill) : parseInt(player.stoneSkill);

  const distanceTravelled = (currentTimestamp - parseInt(player.startTimestamp)) / SPEED_DIVISOR;
  const distanceNeeded = distance(
    parseInt(player.startTile.x),
    parseInt(player.startTile.y),
    parseInt(player.endTile.x),
    parseInt(player.endTile.y)
  );

  if (distanceTravelled >= distanceNeeded && resourceId.toString() === player.endTile.resourceId) {
    const skillIncrease = (currentTimestamp - (parseInt(player.startTimestamp) + distanceNeeded * SPEED_DIVISOR)) /
      SKILL_INCREASE_DIVISOR;

    return savedBalance + skillIncrease * savedSkill + (skillIncrease * skillIncrease) / 2;
  }

  return savedBalance;
}
