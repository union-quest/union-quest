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
import { AbiCoder } from '@ethersproject/abi';
import { keccak256 } from '@ethersproject/keccak256';
import { BigNumber } from '@ethersproject/bignumber';
import type { Item } from '$lib/item/items';


export type Player = {
  id: string;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  startTimestamp: string;
  vouch: string;
  balances: { id: string; player: string, item: Item, value: string, skill: string }[];
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
        startTimestamp
        vouch
        startX
        startY
        endX
        endY
        balances {
          id
          value
          skill
          item {
            id
            name
            symbol
            tools {
              id
            }
          }
        }
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

export const getItem = (x: number, y: number) => {
  if (x == 0 && y == 0 || x > 10 || x < -9 || y > 10 || y < -9) {
    return 0;
  }

  const abiCoder = new AbiCoder();

  const res = BigNumber.from(keccak256(abiCoder.encode(['int256', 'int256'], [x, y]))).mod(BigNumber.from(5)).toNumber();
  if (res < 2) {
    return 0;
  } else if (res < 4) {
    return 1;
  }

  return 2;

}

export const getPosition = (player: Player, currentTimestamp: number): [number, number] => {
  const distanceTravelled = (currentTimestamp - parseInt(player.startTimestamp)) / 10;
  const distanceNeeded = distance(
    parseInt(player.startX),
    parseInt(player.startY),
    parseInt(player.endX),
    parseInt(player.endY)
  );

  if (distanceTravelled < distanceNeeded) {
    const vX = parseInt(player.endX) - parseInt(player.startX);
    const vY = parseInt(player.endY) - parseInt(player.startY);

    return [
      parseInt(player.startX) + (vX * distanceTravelled) / distanceNeeded,
      parseInt(player.startY) + (vY * distanceTravelled) / distanceNeeded,
    ];
  }

  return [parseInt(player.endX), parseInt(player.endY)];
}

export const getSkill = (player: Player, currentTimestamp: number, resourceId: number): number => {
  const distanceTravelled = (currentTimestamp - parseInt(player.startTimestamp)) / SPEED_DIVISOR;
  const distanceNeeded = distance(
    parseInt(player.startX),
    parseInt(player.startY),
    parseInt(player.endX),
    parseInt(player.endY)
  );

  const resourceBalance = player.balances.find(b => b.item.id === resourceId.toString());
  const toolBalances = player.balances.filter(b => resourceBalance.item.tools.some(t => t.id === b.item.id));

  const savedSkill = resourceBalance ? parseInt(resourceBalance.skill) : 0;
  const hasTool = toolBalances.some(b => parseInt(b.value) > 0);

  const tileItem = getItem(parseInt(player.endX), parseInt(player.endY));

  if (distanceTravelled >= distanceNeeded && resourceId.toString() === tileItem.toString() && hasTool) {
    return savedSkill +
      (currentTimestamp - (parseInt(player.startTimestamp) + distanceNeeded * SPEED_DIVISOR)) /
      SKILL_INCREASE_DIVISOR;
  }

  return savedSkill;
}

export const getBalanceStreamed = (player: Player, currentTimestamp: number, resourceId: string): number => {
  const distanceTravelled = (currentTimestamp - parseInt(player.startTimestamp)) / SPEED_DIVISOR;
  const distanceNeeded = distance(
    parseInt(player.startX),
    parseInt(player.startY),
    parseInt(player.endX),
    parseInt(player.endY)
  );

  const resourceBalance = player.balances.find(b => b.item.id === resourceId.toString());
  // fixme, assumes that user has resource balance
  const toolBalances = player.balances.filter(b => resourceBalance.item.tools.some(t => t.id === b.item.id));

  const savedBalance = resourceBalance ? parseInt(resourceBalance.value) : 0;
  const savedSkill = resourceBalance ? parseInt(resourceBalance.skill) : 0;
  const hasTool = toolBalances.some(b => parseInt(b.value) > 0);

  const tileItem = getItem(parseInt(player.endX), parseInt(player.endY));
  if (distanceTravelled >= distanceNeeded && resourceId.toString() === tileItem.toString() && hasTool) {
    const skillIncrease = (currentTimestamp - (parseInt(player.startTimestamp) + distanceNeeded * SPEED_DIVISOR)) /
      SKILL_INCREASE_DIVISOR;

    return savedBalance + skillIncrease * savedSkill + (skillIncrease * skillIncrease) / 2;
  }

  return savedBalance;
}
