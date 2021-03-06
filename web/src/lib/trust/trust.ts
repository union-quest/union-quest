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

export type Trust = {
  id: string;
  staker: string;
  borrower: string;
  trustAmount: number;
}[]

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

class TrustsStore implements QueryStore<Trust> {
  private queryStore: QueryStore<Trust>;
  private store: Readable<QueryState<Trust>>;
  constructor(endpoint: EndPoint, private transactions: TransactionStore, staker: string) {
    this.queryStore = new HookedQueryStore(
      endpoint,
      `
    query getTrust($staker: String){
      trusts(orderBy: trustAmount, orderDirection:desc, where: {staker: $staker}) {
        id
        staker
        borrower
        trustAmount
      }
    }`,
      chainTempo,
      { path: 'trusts', variables: { staker: staker.toLowerCase() } }
    );
    this.store = derived([this.queryStore, this.transactions], (values) => this.update(values));
  }
  private update([$query]: [QueryState<Trust>, TransactionRecord[]]): QueryState<Trust> {
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
    run: Subscriber<QueryState<Trust>>,
    invalidate?: Invalidator<QueryState<Trust>> | undefined
  ): Unsubscriber {
    return this.store.subscribe(run, invalidate);
  }
}

export const getTrusts = (staker: string) => new TrustsStore(SUBGRAPH_ENDPOINT, transactions, staker);
