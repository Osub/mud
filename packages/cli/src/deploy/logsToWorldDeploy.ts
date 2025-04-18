import { AbiEventSignatureNotFoundError, Log, decodeEventLog, hexToString, parseAbi, getAddress } from "viem";
import { WorldDeploy, worldDeployEvents } from "./common";
import { isDefined } from "@latticexyz/common/utils";

export function logsToWorldDeploy(logs: readonly Log<bigint, number, false>[]): Omit<WorldDeploy, "stateBlock"> {
  const deployLogs = logs
    .map((log) => {
      try {
        return {
          ...log,
          ...decodeEventLog({
            strict: true,
            abi: parseAbi(worldDeployEvents),
            topics: log.topics,
            data: log.data,
          }),
          // Log addresses are not checksummed, but we want them checksummed before writing to disk.
          // https://github.com/wevm/viem/issues/2207
          address: getAddress(log.address),
        };
      } catch (error: unknown) {
        if (error instanceof AbiEventSignatureNotFoundError) {
          return;
        }
        throw error;
      }
    })
    .filter(isDefined);

  // TODO: should this test for/validate that only one of each of these events is present? and that the address/block number don't change between each?
  const { address, deployBlock, worldVersion, storeVersion } = deployLogs.reduce<Partial<WorldDeploy>>(
    (deploy, log) => ({
      ...deploy,
      address: log.address,
      deployBlock: log.blockNumber,
      ...(log.eventName === "HelloWorld"
        ? { worldVersion: hexToString(log.args.worldVersion).replace(/\0+$/, "") }
        : null),
      ...(log.eventName === "HelloStore"
        ? { storeVersion: hexToString(log.args.storeVersion).replace(/\0+$/, "") }
        : null),
    }),
    {},
  );

  if (address == null) throw new Error("could not find world address");
  if (deployBlock == null) throw new Error("could not find world deploy block number");
  if (worldVersion == null) throw new Error("could not find world version");
  if (storeVersion == null) throw new Error("could not find store version");

  return { address, deployBlock, worldVersion, storeVersion };
}
