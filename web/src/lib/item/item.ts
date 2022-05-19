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

export type Item = { id: string, name: string, symbol: string, stake: string, tools: Item[], recipes: any[] }

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

class ItemStore implements QueryStore<Item> {
  private queryStore: QueryStore<Item>;
  private store: Readable<QueryState<Item>>;
  constructor(endpoint: EndPoint, private transactions: TransactionStore, id: string) {
    this.queryStore = new HookedQueryStore(
      endpoint,
      `
    query getItem($id: ID!) {
      item(id: $id) {
        id
        name
        symbol
        stake
        tools {
          id
          name
          symbol
        }
        recipes {
          id
          inputs {
            id
            name
            symbol
          }
          inputQuantities
          output {
            id
            name
            symbol
          }
        }
      }
    }`,
      chainTempo,
      { path: 'item', variables: { id: id } }
    );
    this.store = derived([this.queryStore, this.transactions], (values) => this.update(values));
  }
  private update([$query]: [QueryState<Item>, TransactionRecord[]]): QueryState<Item> {
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
    run: Subscriber<QueryState<Item>>,
    invalidate?: Invalidator<QueryState<Item>> | undefined
  ): Unsubscriber {
    return this.store.subscribe(run, invalidate);
  }
}

export const getItem = (id: string) => new ItemStore(SUBGRAPH_ENDPOINT, transactions, id);
