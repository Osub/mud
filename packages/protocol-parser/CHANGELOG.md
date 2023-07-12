# @latticexyz/protocol-parser

## 1.43.0-next.0

### Minor Changes

- [#1100](https://github.com/latticexyz/mud/pull/1100) [`b98e5180`](https://github.com/latticexyz/mud/commit/b98e51808aaa29f922ac215cf666cf6049e692d6) Thanks [@alvrs](https://github.com/alvrs)! - feat: add abiTypesToSchema, a util to turn a list of abi types into a Schema by separating static and dynamic types

- [#1111](https://github.com/latticexyz/mud/pull/1111) [`ca50fef8`](https://github.com/latticexyz/mud/commit/ca50fef8108422a121d03571fb4679060bd4891a) Thanks [@alvrs](https://github.com/alvrs)! - feat: add `encodeKeyTuple`, a util to encode key tuples in Typescript (equivalent to key tuple encoding in Solidity and inverse of `decodeKeyTuple`).
  Example:

  ```ts
  encodeKeyTuple({ staticFields: ["uint256", "int32", "bytes16", "address", "bool", "int8"], dynamicFields: [] }, [
    42n,
    -42,
    "0x12340000000000000000000000000000",
    "0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF",
    true,
    3,
  ]);
  // [
  //  "0x000000000000000000000000000000000000000000000000000000000000002a",
  //  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd6",
  //  "0x1234000000000000000000000000000000000000000000000000000000000000",
  //  "0x000000000000000000000000ffffffffffffffffffffffffffffffffffffffff",
  //  "0x0000000000000000000000000000000000000000000000000000000000000001",
  //  "0x0000000000000000000000000000000000000000000000000000000000000003",
  // ]
  ```

### Patch Changes

- [#1075](https://github.com/latticexyz/mud/pull/1075) [`904fd7d4`](https://github.com/latticexyz/mud/commit/904fd7d4ee06a86e481e3e02fd5744224376d0c9) Thanks [@holic](https://github.com/holic)! - Add store sync package
