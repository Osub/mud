# @latticexyz/block-logs-stream

## 1.43.0-next.0

### Minor Changes

- [#1070](https://github.com/latticexyz/mud/pull/1070) [`72b80697`](https://github.com/latticexyz/mud/commit/72b806979db6eb2880772193898351d657b94f75) Thanks [@holic](https://github.com/holic)! - Add block logs stream package

  ```ts
  import { filter, map, mergeMap } from "rxjs";
  import { createPublicClient, parseAbi } from "viem";
  import {
    createBlockStream,
    isNonPendingBlock,
    groupLogsByBlockNumber,
    blockRangeToLogs,
  } from "@latticexyz/block-logs-stream";

  const publicClient = createPublicClient({
    // your viem public client config here
  });

  const latestBlock$ = await createBlockStream({ publicClient, blockTag: "latest" });

  const latestBlockNumber$ = latestBlock$.pipe(
    filter(isNonPendingBlock),
    map((block) => block.number)
  );

  latestBlockNumber$
    .pipe(
      map((latestBlockNumber) => ({ startBlock: 0n, endBlock: latestBlockNumber })),
      blockRangeToLogs({
        publicClient,
        address,
        events: parseAbi([
          "event StoreDeleteRecord(bytes32 table, bytes32[] key)",
          "event StoreSetField(bytes32 table, bytes32[] key, uint8 schemaIndex, bytes data)",
          "event StoreSetRecord(bytes32 table, bytes32[] key, bytes data)",
          "event StoreEphemeralRecord(bytes32 table, bytes32[] key, bytes data)",
        ]),
      }),
      mergeMap(({ logs }) => from(groupLogsByBlockNumber(logs)))
    )
    .subscribe((block) => {
      console.log("got events for block", block);
    });
  ```

### Patch Changes

- [#1075](https://github.com/latticexyz/mud/pull/1075) [`904fd7d4`](https://github.com/latticexyz/mud/commit/904fd7d4ee06a86e481e3e02fd5744224376d0c9) Thanks [@holic](https://github.com/holic)! - Add store sync package
